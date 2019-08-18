## 21 Todos Aplikacja - Część 16 - Zapisanie Redux State w lokalnej pamięci przeglądarki - Local Storage
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

W momencie odświeżania przeglądarki state jest przywracany do początkowego. Można tego uniknąć zapisując go 
w lokalnej pamięci przeglądarki - local storage.
          
```javascript
// localStorage.js
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        //ignore
    }
};
```
```javascript
// configureStore.js
import {createStore} from 'redux';
import todoApp from '../reducers/todos';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(todoApp, persistedState);

//cały store
store.subscribe(() => {
    saveState(store.getState());
});

//store bez filtrów tylko todo
store.subscribe(() => {
    saveState({todos: store.getState().todos})
});

//store zapisywany tylko 1 na 5 sek
store.subscribe(throttle(() => {
    saveState({todos: store.getState().todos});
}, 5000));

const configureStore = () => {
    return store;
};

export default configureStore;
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/20-todoapps-initial-state/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/22-todoapps-refactor-entry-point/README.md)
 </sub>