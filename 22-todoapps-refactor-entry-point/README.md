## 22 Todos Aplikacja - Część 17 - Refactoring punktu wejściowego aplikacji. Redux state w pamięci sesji - Session Storage
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Zmiany w punkcie startowym aplikacji. Zmiana z local storage na session storage.
          
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/Root";
import configureStore from "./store/configureStore";
import 'semantic-ui-css/semantic.min.css'

const store = configureStore();
ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
);
```
```javascript
// components/Root.js
// zmiana nazwy z TodoApp na App
import React from 'react';
import App from "./App";
import {Provider} from "react-redux";

const Root = ({store}) => (
    <Provider store={store}>
        <App/>
    </Provider>
);

export default Root;
```
```javascript
// localStorage.js - zmian na sessionStorge  
const serializedState = sessionStorage.getItem("todosAppState");
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/21-todoapps-persist-state-to-local-storage/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/23-.../README.md)
 </sub>