## 08 Todos Aplikacja - Część 3 - Filtrowanie todos. Uzupełnienie reduktora o visibilityFilter. Komponent FilterLink, uzupełnienie TodoApps 
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 3 aplikacji Todos - rozszerzamy reduktor o visibilityFilter 


```javascript
// reducers/todos.js
import {combineReducers} from 'redux';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos: todos,
    visibilityFilter: visibilityFilter
});

````
Komponent FilterLink
```javascript
import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';

class FilterLink extends Component {

    render() {
        const {store, filter, currentFilter} = this.props;

        if (filter === currentFilter) {
            return <Button active size="small">
                        <Icon name='checkmark'/>{this.props.children}<Icon />
                   </Button>
        }

        return (
            <a  href='#?' onClick={e => {
                e.preventDefault();
                console.log("BEFORE", store.getState());
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                });
                console.log("AFTER", store.getState());
            }}>
                <Button size="small"><Icon/>{this.props.children}<Icon /></Button>
            </a>
        )
    };
}

export default FilterLink;
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
                            <FilterLink {...this.props} filter='SHOW_ACTIVE' 
                                currentFilter={visibilityFilter}>Active</FilterLink>
                            <span style={{width: '5px', display: 'inline-block'}}/>
                            <FilterLink {...this.props} filter='SHOW_COMPLETED' 
                                currentFilter={visibilityFilter}>Competed</FilterLink>
                        </Grid.Column>
                    </Grid>
                    ...
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Label.Group tag>
                                {visibleTodos.map((x) =>
                                    <Label as='a' onClick={() => this.onTodoClick(x.id)} 
                                    style={{textDecoration: x.completed ? 'line-through' : 'none'}} 
                                    key={x.id}>{x.text}</Label>
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
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/07-todoapps-toggling-todo/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/09-todoapp-extracting-presentional/README.md)
 </sub>