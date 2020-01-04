## 29 Todos Aplikacja - Część 24 - Opakowanie metody dispatch obiektu store. Logowanie state aplikacji.
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Poniżej opakujemy oryginalną funkcję dispatch Redux store. W taki sposób aby logować poprzedni stan aplikacji, wydelegowaną akcję która zmieniła stan 
i stan po dokonaniu akcji. Inaczej mówiąc rozszerzymy standardowe działanie delegowania akcji dodajac nową funkcjonalność. 

Zmiany dokonywane na poziomie store/configureStore.js
```javascript
// Był:
const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(todoApp, persistedState);

    store.subscribe(throttle(() => {
        saveState({todos: store.getState().todos});
    }, 1000));

    return store;
};

export default configureStore;
```

```javascript
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

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(todoApp, persistedState);

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }

    store.subscribe(throttle(() => {
        saveState({todos: store.getState().todos});
    }, 1000));

    return store;
};

export default configureStore;

```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/28-todoapps-normalizing-state/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/30-.../README.md)
 </sub>