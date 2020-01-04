## 30 Todos Aplikacja - Część 25 - Dodanie imitowanej bazy danych. Symulacja asynchronicznego pobrania danych.
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Symulacja istnienia backend - (bazy danych) z danym Todo. Dane z backend będą pobierane z wymuszonym opóźnieniem asynchronicznie i w tej chwili jedynie logowane na konsoli.    
Usuwamy z projektu odkładanie danych z sesji - plik localStorage.js. Dodajemy katalog api z index.js.
```javascript
//api/index.js
const v4 = require('uuid/v4');

const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'P.' + Math.ceil(1000 * Math.random()),
            completed: true,
        },
        {
            id: v4(),
            text: 'P.' + Math.ceil(1000 * Math.random()),
            completed: true,
        },
        {
            id: v4(),
            text: 'P.' + Math.ceil(1000 * Math.random()),
            completed: false,
        },
        {
            id: v4(),
            text: 'P.' + Math.ceil(1000 * Math.random()),
            completed: false,
        }
    ],
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) => delay(1000).then(() => {
    if (Math.random() > 0.99) {
        throw new Error('Network simulation Exception');
    }

    switch (filter) {
        case 'all':
            return fakeDatabase.todos;
        case 'completed':
            return fakeDatabase.todos.filter(
                t => t.completed
            );
        case 'active':
            return fakeDatabase.todos.filter(
                t => !t.completed
            );
        default:
            throw new Error(`Unknown filter: ${filter}.`);
    }
});
```
Zmiany dokonywane na poziomie store/configureStore.js. Usuwamy z projektu odkładanie danych z sesji - plik localStorage.js

```javascript
// Był:
import {createStore} from 'redux';
import todoApp from '../reducers';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

const addLoggingToDispatch = (store) => {
    ....
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

```javascript
// Jest:
const addLoggingToDispatch = (store) => {
    ...
};

//wypisanie na konsoli todos z fake DB
fetchTodos("all").then(x => console.log("Todos From Fake DB", x));

const configureStore = () => {
    const store = createStore(todoApp);

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }

    return store;
};

export default configureStore;

```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/29-todoapps-wrapping-dispatch/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/31-.../README.md)
 </sub>