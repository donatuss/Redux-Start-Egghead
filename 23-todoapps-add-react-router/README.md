## 23 Todos Aplikacja - Część 18 - Dodanie React Router
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Dodanie React Router. Polecenie _yarn add react-router-dom_.
```javascript
// components/Root.js
import React from 'react';
import App from "./App";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from 'react-router-dom'

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}/>
        </Router>
    </Provider>
);

export default Root;
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/22-todoapps-refactor-entry-point/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/24-todoapps-navigate-react-router-link/README.md)
 </sub>