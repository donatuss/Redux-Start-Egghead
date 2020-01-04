## 26 Todos Aplikacja - Część 21 - Skrócona notacja użyta w mapDispatchToProps
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Użyjemy skróconej notacji w zapisie funkcji mapDispatchToProps. W tym konkretnym przypadku funkcja mapDispatchToProps przyjmuje jako parametr funkcję dispatch (wywołanie zwrotne callback), 
w celu jej poźniejszego wywołania. mapDispatchToProps umożliwia wstrzykniecie do komponentu TodoList właściwości onTodoClick dzięki której możliwe jest wygenerowanie akcji (wywołanie zwrotne funkcji dispatch - callback).
Właściwości onTodoClick przyjmuje argument który jest bezpośrednio przekazywany celem uzykania obiektu akcji toggleTodo - możemy użyć tej skróconej formy zapisu funkcji mapDispatchToProps - jak poniżej.  

```javascript
// containers/VisibleTodoList.js
// Był:
import TodoList from "../components/TodoList";
import {toggleTodo} from "../actions/todo";

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList))

// Zmiana na:
import TodoList from "../components/TodoList";
import {toggleTodo} from "../actions/todo";

export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(TodoList))
```

```javascript
// components/TodoList.js
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
```



<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/25-todoapps-withRouter/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/27-todoapps-colocation-selectors-with-reducers/README.md)
 </sub>