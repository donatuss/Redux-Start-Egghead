## 15 Todos Aplikacja - Część 10 - Redux-React connect - przekazanie danych do komponentów prezentacji
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 10 aplikacji Todos - Zmiana komponentu kontenera VisibleTodoList. Użycie funkcji connect z react-redux.
Przekazanie do docelowego komponentu prezentacji TodoList jako właściwość - mu niezbędnych danych, a wyliczanych na bazie obecnego state aplikacji (mapStateToProps)
Przekazanie do docelowego komponentu prezentacji TodoList jako właściwość - mu niezbędnych funkcji realizujących wydelegowanie akcji (mapDispatchToProps)         

```javascript
//VisibleTodoList.js
import {connect} from 'react-redux';
import TodoList from "../components/TodoList";


const getVisibleTodos = (todos, filter) => {
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

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

```javascript
//TodoList.js
class TodoList extends Component {

    render() {
        const {todos, onTodoClick} = this.props;

        return <Label.Group tag>
            {todos.map((x) =>
                <Todo onClick={() => onTodoClick(x.id)} key={x.id} {...x}/>
            )}
        </Label.Group>

    };
}

export default TodoList;
```
 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/14-todoapps-use-react-redux-provider/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/16-todoapps-react-redux-connect-2/README.md)
 </sub>