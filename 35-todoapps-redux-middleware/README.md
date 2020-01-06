## 35 Todos Aplikacja - Część 30 - Redux ApplyMiddleware - zmiana własnej implementacji na Radux
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Stworzone w poprzedniej części funkcje opakowujące dispatch umieszczone we własnej implementacji middlware
zastąpimy implementacjami z bibliotek użytkowych redux```yarn add redux-promise redux-logger  ```
```javascript
///store/configureStore.js
// Było:
import {createStore} from 'redux';
import todoApp from '../reducers';

const logger = (store) => next => {
    if (!console.group) {
        return next;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: red', action);
        const returnValue = next(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

const promise = (store) => next => {
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(next)
        }
        return next(action);
    };
};

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

```javascript
//store/configureStore.js
//Jest: 
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import todoApp from '../reducers';

const configureStore = () => {
    const middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );
};
```
<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/34-todoapps-middleware-chain/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/36-todoapps-update-state-with-fakedb-data/README.md)
 </sub>