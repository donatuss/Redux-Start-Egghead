## 32 Todos Aplikacja - Część 27 - Pobranie danych (cd..) delegowanie akcji po pobraniu danych. Pobranie danych w kontekście ustawionego routingu
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Komponent VisibleTodoList w zależności od kontekstu wygeneruje akcję informująca o otrzymaniu danych z backend-u.
Krok 1. Modyfikacja komponentu - wyodrębnienie funkcji fetchData      
```javascript
//containers/VisibleTodoList.js
class VisibleTodoList extends Component {
    
    // Był:
    componentDidMount() {
        fetchTodos(this.props.filter).then(x => console.log("Todos From Fake DB", x));
    }
    componentDidUpdate(prevProps){
        if(prevProps.filter !== this.props.filter){
            fetchTodos(this.props.filter).then(x => console.log("Todos From Fake DB", x));
        }
    }
    
    // Zamina na :
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps){
        if(prevProps.filter !== this.props.filter){
            this.fetchData();
        }
    }
    fetchData() {
        fetchTodos(this.props.filter).then(x => console.log("Todos From Fake DB", x));
    }
        
    render() {
        return <TodoList {...this.props}/>
    }
}

const mapStateToProps = (state, param) => {
    const filter = param.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
};
```
Krok 2. Chcemy aby informacja o routingu stałą się częścią Redux state, jedyny sposób jego modyfikacji to wydelegowanie akcji. Pod nazwą receiveTodos przekazaną do komponentu jako properties 
przekażemy funkcje która w momencie otrzymania danych z backend-u wygeneruje akcje (wywołanie zwrotne dispach)  
```javascript
import {toggleTodo, receiveTodos} from "../actions/todo";

class VisibleTodoList extends Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps){
        if(prevProps.filter !== this.props.filter){
            this.fetchData();
        }
    }
    
    //receiveTodos zczytywana z props
    fetchData() {
        const {filter, receiveTodos} = this.props;
        fetchTodos(filter).then(todos => receiveTodos(filter, todos));
    }

    render() {
        return <TodoList {...this.props}/>
    }
}

//filter dostarczony do props z routingu
const mapStateToProps = (state, param) => {
    const filter = param.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
};

/*
receiveTodos dostarczony do props realizujący wywołanie wywołania zwrotnego - funkcji dispach,
w momencie pobrania danych - w tym przypadku promise fetchTodos wywoływany z poziomu fetchData w momencie
zmountowania komponentu - componentDidMount lub w momencie zmiany parametru filter w componentDidUpdate
a wiec też w momencie zmiany routingu
*/   
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        },
        receiveTodos: (filter, response) => {
            dispatch(receiveTodos(filter, response));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList));

// receiveTodos to akcja zdefiniowana w action/todo.js 
export const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});
```
Krok 3. Używając skróconej notacji możemy usunąć mapDispatchToProps z VisibleTodoList.js i zapisać

```javascript
// Zamiast 
/*
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        },
        receiveTodos: (filter, response) => {
            dispatch(receiveTodos(filter, response));
        }
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList));
*/

// Jest
export default withRouter(
    connect(mapStateToProps, {onTodoClick: toggleTodo, receiveTodos})(VisibleTodoList)
    );
```
Krok 4. Zmodyfikujemy zapis ```export default withRouter( ...)``` skrócając jego formę jeszcze.
```javascript
// Zamiast
/* 
import {toggleTodo, receiveTodos} from "../actions/todo";
...
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList));
*/

// Jest 
// (akcje sa wyniesione do pliku index.js z todo.js)
import * as actions from "../actions";
export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));

//Ponieważ komponent TodoList korzysta z properties onTodoClick delegując w wywołaniu zwrotnym akcję 
//toggleTodo, a nazwy są różne należy przekazać properties wywołana zwrotnego pod nazwą onTodoClick.
// Zamiast:
render() {
    return <TodoList {...this.props}/>
}

// Jest:
render() {
    const {toggleTodo, ...rest} = this.props;
    return <TodoList onTodoClick={toggleTodo} {...rest}/>
}
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/31-todoapps-fetch-data-on-route-change/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/33-.../README.md)
 </sub>