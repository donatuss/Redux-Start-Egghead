## Aplikacja Todos - Cześć 1 - React,Redux,Semantic  
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 1 aplikacji Todos - używającej React i Redux, Semantic UI React.

Struktura:
```
├── node_modules
├── package.json
├── public
│   └── index.html
└── src
    ├── actions
    ├── components
    │   └── TodoApp.js
    ├── index.js
    ├── reducers
    │   └── todos.js
    └── store
        └── configureStore.js

 ```

Punkt startowy
```html
<!-- index.html -->
<body>
<div id="root"></div>
</body>
```
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css' //konfiguracja SemanticUI

import TodoApp from './components/TodoApp'; //komponent TodoApp
import configureStore from './store/configureStore'; //konfiguracja Redux Store 

ReactDOM.render(
    <TodoApp store={configureStore()}/>,
    document.getElementById('root')
);
````
Konfiguracja Redux Store
```javascript
//configureStore.js
import {createStore} from 'redux';
import reducer from '../reducers/todos';

const configureStore = () => {
    return createStore(reducer);
};

//reducer/todos.js
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            ...
        default:
            return state;
    }
};
````
Komponent TodoApp
```javascript
import React, {Component} from 'react';
import {Container, Grid, Divider, Label, Button, Input} from 'semantic-ui-react';


class TodoApp extends Component {

    constructor() {
        super();
        this.state = {
            txt1: 'E.' + Math.ceil(1000 * Math.random())
        };
    }

    componentWillMount() {
        const {store} = this.props;

        // callback after action
        store.subscribe(() => {
            this.setState({txt1: this.rTxt1['inputRef'].current.value});
            this.rTxt1['inputRef'].current.value = "";
        });

    }


    handleClick = (e) => {
        const {store} = this.props;
        const v4 = require('uuid/v4');

        let _text =  e;
        if(this.rTxt1['inputRef'].current.value.trim() !== ""){
            _text = this.rTxt1['inputRef'].current.value;
        }
        console.log("BEFORE", store.getState());

        store.dispatch({
            type: 'ADD_TODO',
            id: v4(),
            text: _text
        });

        console.log("AFTER", store.getState());
    };


    render() {
        let random = 'E.' + Math.ceil(1000 * Math.random());

        return (
            <div>
                <Container fluid>
                    <Divider/>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Input ref={node => this.rTxt1 = node} input={<input/>} type='text'/>
                            <span style={{width: '5px', display: 'inline-block'}}/>
                            <Button name="btnAddTodo" onClick={this.handleClick.bind(null, random)}>
                                AddTodo - {random}
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Label.Group tag>
                                {this.props.store.getState().map((x) =>
                                    <Label as='a' key={x.id}>{x.text}</Label>
                                )}
                            </Label.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default TodoApp;
````



 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/05-reducer-composition/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/07-todoapps-toggling-todo/README.md)
 </sub>