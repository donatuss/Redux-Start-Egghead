## 25 Todos Aplikacja - Część 20 - Przekazywanie parametrów Router za pomocą withRouter
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Parametry dostarczany przez React Router - np. filter zamiast przekazywać je w sposób bezpośredni do komponentów jako properties - możemy przekazywać niejawnie za pomocą      
konstrukcji withRouter z biblioteki react-router. 

Krok 1. Przekazanie kontekstu aplikacji w wyniku wybrania przycisku filtra. Komponent Link jest już zbędny. Obsługa akcji poprzednio wyprodukowana za pomocą mapDispatchToProps 
w komponencie FilterLink została usunięta a cały komponent FilterLink przedefiniowany w ten sposób że wykorzystując NavLink zmienia kontekst URL aplikacji. 
```javascript
// components/App.js
// Był:
class App extends Component {
    render() {
        return (
            ...
            <Grid.Column>
                <VisibleTodoList filter={match.params.filter || 'all'}/>
            </Grid.Column>
            ...
        );
    }
}
// Zmiana na:
class App extends Component {
    render() {
        return (
            ...
            <Grid.Column>
                <VisibleTodoList/>
            </Grid.Column>
            ...
        );
    }
}
```
```javascript
// containers/VisibleTodoList.js
import {withRouter} from 'react-router'

/*
Było
const mapStateToProps = (state, ownProps) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            ownProps.filter
        )
    };
};
*/

/* Jest */
const mapStateToProps = (state, {match: {params: {filter}}}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            filter || "all"
        )
    };
};

/* co jest równoważne */
const mapStateToProps = (state, param) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            param.match.params.filter || "all"
        )
    };
};

const mapStateToProps = (state, {match}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            match.params.filter || "all"
        )
    };
};

const mapStateToProps = (state, {match: {params}}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            params.filter || "all"
        )
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/24-todoapps-navigate-react-router-link/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/26-todoapps-shorthand-notation/README.md)
 </sub>