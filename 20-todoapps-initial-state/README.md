## 20 Todos Aplikacja - Część 15 - Dostarczenie początkowego stanu aplikacji - Redux state
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Startowy state można podać w funkcji createStore (obie formy persistedState dodadzą 1 początkowe todo)         

```javascript
// configureStore.js
const persistedState = {
    todos: [{id: "0", text: "Earn.100.USD", completed: false}],
    visibilityFilter: undefined
};
const persistedState = {
    todos: [{id: "0", text: "Earn.100.USD", completed: false}]
};

const configureStore = () => {
    return createStore(reducer, persistedState);
};
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/19-todoapps-simplifying-arrow-functions/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/21-todoapps-persist-state-to-local-storage/README.md)
 </sub>