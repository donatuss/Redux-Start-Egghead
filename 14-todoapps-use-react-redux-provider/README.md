## 14 Todos Aplikacja - Część 9 - Przekazywanie Redux Store w dół przez Context - Redux-React ReactReduxContext.Provider
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 9 aplikacji Todos - w poprzedniej części zdefiniowany został komponent Provider, użyty do przekazania w dół Redux Store za pomocą kontekstu. 
Teraz zamiast własnej klasy Provider używamy wbudowanej w bibliotekę redux-react klasy Provider    

```javascript
//index.js
import ReactDOM from 'react-dom';
import {ReactReduxContext} from 'react-redux';
import 'semantic-ui-css/semantic.min.css'

import TodoApp from './components/TodoApp';
import configureStore from './store/configureStore';

const store= configureStore();

ReactDOM.render(
    <ReactReduxContext.Provider value={{store:store}}>
        <TodoApp/>
    </ReactReduxContext.Provider>,
    document.getElementById('root')
);
```

```javascript
//FilterLink.js
import React, {Component} from 'react';
import Link from "../components/Link";
import {ReactReduxContext} from 'react-redux';


class FilterLink extends Component {
    static contextType = ReactReduxContext;

    onFilterClick = (filter) => {
        const {store} = this.context;
    };

    render() {
        const {store} = this.context;
    };
}

export default FilterLink
```
 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/12-todoapp-extracting-container-2/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/14-.../README.md)
 </sub>