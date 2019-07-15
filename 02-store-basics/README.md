## Redux Store 
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Redux Store to struktura która wiąże ze sobą trzy zasady Redux. Mianowicie:
+ przechowuje bieżący stan aplikacji (state)
+ udostępnia funkcje realizującą wysyłanie akcji
+ przy jego tworzeniu wymagane wyspecyfikowanie funkcji Reducer, która określa jak stan aplikacji zmienia sie w wyniku akcji 

#### Przykład 1 - Prosty Redux store

```javascript
/* funkcja reducer */ 
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

/* funkcja createStore z bibloteki Redux */
const {createStore} = Redux;

/* Redux Store */
const store = createStore(counter);
``` 
Redux store posiada 3 ważne metody:
+ _getState()_ - zwraca state, bieżący stan aplikacji
+ _dispatch(action)_ - realizuje wydelegowanie akcji zmieniającej state 
+ _subscribe(f)_ - metoda rejestrująca wywołanie zwrotne (funkcję f) - która będzie wywoływana za każdym razem gdy delegowana będzie akcja.
Pozwala to na aktualizacje UI aplikacji - zgodnie z aktualnym jej stanem - state. 

```javascript
let h1 = document.getElementById("h1");
let buttonPlus = document.getElementById("btnP");
let buttonMinus = document.getElementById("btnM");

/* funkcja render - odzwierciedla bieżący stan aplikacji w tagu h1 */
const render = () => {
    h1.innerText = store.getState();
};

/* rejestracja funkcji render w Redux Store. 
Każde delegowanie akcji spowoduje jej wywołanie */
store.subscribe(render);

/* Na przyciskach buttonPlus, buttonMinus wyzwolenie akcji INCREMENT, DECREMENT */
buttonPlus.addEventListener('click', () => {
    store.dispatch({type: "INCREMENT"})
});
buttonMinus.addEventListener('click', () => {
    store.dispatch({type: "DECREMENT"})
});

``` 

#### Przykład 2 - Tworzenie Redux Store od podstaw
W poprzednim przykładzie Redux Store uzyskaliśmy korzystając z bibloteki Redux. Poniżej przykład jej możliwej prostej implementacji.
```javascript
const createStore = (reducer) => {
    
    /* state - stan aplikacji */
    let state;
    
    /* tablica zarejestrowanych funkcji wywoływanych przy delegowaniu akcji */  
    let listeners = [];
    
    /* metoda getState - zwraca aktualny state */
    const getState = () => state;
    
    /* dispatch - przyjmuję akcje i na jej podstawie i reducer-a 
       określa nowy state. Jednocześnie po jego przeliczeniu wywołane 
       są zarejestrowane wcześniej w tablicy listeners funkcje  */  
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    /* subscribe - rejestruje funkcje celem wywołania jej
       przy delegowaniu akcji */ 
    const subscribe = (listener) => {
        listeners.push(listener);
        
        // pozwala na wyrejestrowanie funkcji
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    };
    
    /* należy wywołać dispatch celem zapewnienie 
    początkowego stanu aplikacji (state) */
    dispatch({});

    return {getState, dispatch, subscribe};
};
```
Poniżej wykorzystanie
```javascript

/* store */
const store = createStore(counter);


/* rejestracja funkcji */
const render = () => {
    h1.innerText = store.getState();
};
const logger = () => {
    console.log("logger:", store.getState())

store.subscribe(logger);
store.subscribe(render);

/* delegacja akcji */
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "DECREMENT"});

/* wyrejestrowanie logger */
store.subscribe(logger)();
 ```
 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/01-redux-principles/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)
 </sub>