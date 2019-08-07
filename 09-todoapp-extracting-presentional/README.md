## 08 Todos Aplikacja - Część 4 -  Wyodrębnienie komponentów odpowiedzialnych za prezentację
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 4 aplikacji Todos - komponenty prezentacyjne Todo, TodoList  nie zawierają logiki, odpowiadają jedynie z prezentacje (widok).
Elementy (funkcje, obiekty) potrzebne do wyrysowania przez nie widoku są im dostarczane. 

Komponent Todo
```javascript
import React from 'react';
import {Label} from 'semantic-ui-react';

const Todo = ({onClick, completed, text}) => (
    <Label as='a'
           onClick={onClick}
           style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
    </Label>
);

export default Todo
````
Komponent TodoList
```javascript
import React from 'react';
import {Label} from 'semantic-ui-react';
import Todo from './Todo';

const TodoList = ({todos, onTodoClick}) => (
    <Label.Group tag>
        {todos.map((x) =>
            <Todo onClick={() => onTodoClick(x.id)} key={x.id} {...x}/>
        )}
    </Label.Group>
);

export default TodoList;
````

Komponent TodoApp
 ```javascript
class TodoApp extends Component {
    
    ...
     
    getVisibleTodos = (todos, filter) => {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_COMPLETED':
                return todos.filter(
                    t => t.completed
                );
            case 'SHOW_ACTIVE':
                return todos.filter(
                    t => !t.completed
                );
            default:
                return todos;
        }
    };

    render() {
        
        const {todos, visibilityFilter} = this.props.store.getState();
        
        const visibleTodos = this.getVisibleTodos(
            todos,
            visibilityFilter,
        );

        return (
            <div>
                <Container fluid>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <FilterLink {...this.props} filter='SHOW_ALL' 
                                currentFilter={visibilityFilter}>All</FilterLink>
                            <span style={{width: '5px', display: 'inline-block'}}/>
                            ...
                        </Grid.Column>
                    </Grid>
                    ...
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Grid.Column>
                                <TodoList todos={visibleTodos} onTodoClick={this.onTodoClick}/>
                            </Grid.Column>
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
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/08-todoapp-filtering-todos/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/08-todoapp-filtering-todos/README.md)
 </sub>