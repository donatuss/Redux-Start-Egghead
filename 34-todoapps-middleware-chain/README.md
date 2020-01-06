## 34 Todos Aplikacja - Część 29 - Middleware Chain - opakowanie dispatch
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Zastąpimy zapisy funkcji opakowującej i zmieniając zachowanie standardowej metody dispatch redux store. Ale wcześniej trochę prostych przykładów:
```javascript
//functional-example_01.js
/*
Przykład 1:
h funkcja która przyjmuje argument x a zwraca jakąś (nieokreśloną funkcję)
próba wypisania h(10) wywołuje błąd ReferenceError
*/
const h = (x) => g;
//console.log("h(10):", h(10)); ReferenceError: g is not defined

/*
Przykład 2:
f funkcja która przyjmuje argument x a zwraca funkcję przyjmującą argument y
w wyniku dając sumę argumentów x i y
*/
const f = (x) => g = y => x + y;
console.log("f(10):", f(10));         //f(10): y => x + y
console.log("f(10)(10):", f(10)(10)); //f(10)(10): 20

/*
Przykład 3:
s funkcja która przyjmuje argument x a zwraca jakąś funkcję (g) przyjmującą jako argument
funkcją w która to jako argument przyjmuje y a w wyniku daje sumę argumentu
x z y oraz wynikiem działania funkcji g na argumencie x i y.
*/
const s = (x) => g => w = y => (x + y + g(x, y));
/*
Funkcje g nie jest jeszcze zdefiniowana więc chcą wywołać tą składnie musimy ją zdefiniować
w taki sposób by przyjmowała 2 argumenty
*/
console.log(s(10)((a1, a2) => (a1 + a2))); //[Function: w]
/*
Powyższa składnia dała mi funkcje która jak odpytam z parametrem 10 otrzymam skumulowany wynik
10 + 10 + (10+10)
*/
console.log(s(10)((a1, a2) => (a1 + a2))(10)); //40

/*
Przykład 4:
f1 przyjmuje argument x zwraca nieokreśloną funkcje f2
f2 przyjmuje jako argument nieokreśloną funkcją f3 a
f3 przyjmuje jako argument określoną funkcją f4 która działą na argumencie y w wyniku
dają sumę x i wynik działania funkcji f2 f3 na argumentach x, y
*/
const f1 = (x) => f2 => f3 => f4 = y => x + f2(x) + f3(y);
console.log(f1(1)(x => x + 1)(x => x + 2)(5)); // 1+(1+1)(5+2) = 10
```
Posługując się logiką z poprzedniego przykładu zmodyfikujemy poniższy przykład  
```javascript
//functional-example_02.js

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    };

    dispatch({});

    return {getState, dispatch, subscribe};
};

const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};
```

```javascript
const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    
    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('prev state:', store.getState());
        console.log('action', action);
        const returnValue = rawDispatch(action);
        console.log('next state:', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

const configureStore = () => {
    const store = createStore(counter);
    store.dispatch = addLoggingToDispatch(store);
    return store;
};
```
Zmiana nr 1:
```javascript

// Zmiana nazwy rawDispatch na next
const addLoggingToDispatch = (store) => {
    const next = store.dispatch;
    
    if (!console.group) {
        return next;
    }

    return (action) => {
        console.group(action.type);
        console.log('prev state:', store.getState());
        console.log('action', action);
        const returnValue = next(action);
        console.log('next state:', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

//Wprowadzenie middlewares i uslugi wrapDispatchWithMmiddlewares
const wrapDispatchWithMmiddlewares = (store, middlewares) => {
    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)
    );
};

const configureStore = () => {
    const store = createStore(counter);
    const middlewares = [];
    middlewares.push(addLoggingToDispatch);
    wrapDispatchWithMmiddlewares(store, middlewares);
    return store;
};
```
Zmiana nr 2:
```javascript

/* 
addLoggingToDispatch to funkcja ktora działa na store i zwraca funkcję next która wykonuje 
na store jakieś działanie np. wypisuje stan store.getState(), oraz funkcja która sama wykonuje 
swoje działanie - w tym przypadku deleguje akcje. 
W chwili definicji jest nieokreślona, ale podajemy ją w wrapDispatchWithMmiddlewares zamieniając 
store.dispatch = middleware(store) 
na 
store.dispatch = middleware(store)(store.dispach) 
określamy że mamy do czynienia z oryginalna funkcją dispach store 
*/

const addLoggingToDispatch = (store) => next => {
    if (!console.group) {
        return next;
    }

    return (action) => {
        console.group(action.type);
        console.log('prev state:', store.getState());
        console.log('action', action);
        const returnValue = next(action);
        console.log('next state:', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

//!!! delegowanie funkcji dispach
const wrapDispatchWithMmiddlewares = (store, middlewares) => {
    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)(store.dispatch)
    );
};

const configureStore = () => {
    const store = createStore(counter);
    const middlewares = [];
    middlewares.push(addLoggingToDispatch);
    wrapDispatchWithMmiddlewares(store, middlewares);
    return store;
};
```
Zmiany na poziomie aplikacji
```javascript
///store/configureStore.js
// Było:
/*
const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: red', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};
*/

// Jest:
const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: red', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

// Było:
/*
const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    return (action) => {
        if(typeof action.then === 'function'){
            return action.then(rawDispatch)
        }
        return rawDispatch(action);
    };
};
*/

// Jest:
const addPromiseSupportToDispatch = (store) => next => {
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(next)
        }
        return next(action);
    };
};

// Było:
/*
const configureStore = () => {
    const store = createStore(todoApp);
    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }

    store.dispatch = addPromiseSupportToDispatch(store);

    return store;
};
*/

// Jest:
const wrapDispatchWithMmiddlewares = (store, middlewares) => {
    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)(store.dispatch)
    );
};

const configureStore = () => {
    const store = createStore(todoApp);
    const middlewares = [];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(addLoggingToDispatch);
    }
    middlewares.push(addPromiseSupportToDispatch);
    wrapDispatchWithMmiddlewares(store, middlewares);

    return store;
};
``` 
Zmiany porządkujące - zmieniam nazwy ```addPromiseSupportToDispatch, addLoggingToDispatch``` na 
```promise, logger``` i dokonuje zmiany organizacji metody ```configureStore```
```javascript
///store/configureStore.js
const wrapDispatchWithMmiddlewares = (store, middlewares) => {
    [...middlewares].reverse().forEach(middleware =>
        store.dispatch = middleware(store)(store.dispatch)
    );
};

const configureStore = () => {
    const store = createStore(todoApp);
    const middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }
    wrapDispatchWithMmiddlewares(store, middlewares);
    return store;
};
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/33-todoapps-wrapping-dispatch-recognize-promise/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/35-.../README.md)
 </sub>