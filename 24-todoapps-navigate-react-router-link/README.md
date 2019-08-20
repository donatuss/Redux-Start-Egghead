## 24 Todos Aplikacja - Część 19 - Nawigacja za pomocą React Router NavLink
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

W pierwszym kroku dodamy do aplikacji nawigację za pomocą zmiany URL wewnętrznych. Tzn. nasze przyciski pokazujące wszystkie, kompletne i aktywne todo będą kierowały nas
na inne miejsca aplikacji. W drugiej części obsłużymy aplikacje aby filtrowała owe todos - odnosząc się do URL a nie bazując jak do tej pory na state aplikacji trzymającego
stan bieżącego filtra (visibilityFilter). Innym słowy wyeliminujemy reduktor i akcje odnoszące się do zmiany stanu filtra - a będziemy bazować na URL 
wewnętrznych aplikacji.   

Krok 1. Przekazanie kontekstu aplikacji w wyniku wybrania przycisku filtra. Komponent Link jest już zbędny. Obsługa akcji poprzednio wyprodukowana za pomocą mapDispatchToProps 
w komponencie FilterLink została usunięta a cały komponent FilterLink przedefiniowany w ten sposób że wykorzystując NavLink zmienia kontekst URL aplikacji. 
```javascript
// components/FilterHeader.js
// Był:
class FilterHeader extends Component {
    render() {
        return (
            <div>
             <FilterLink filter='SHOW_ALL'>All</FilterLink>
             <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
             <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
            </div>
        );
    }
}
// Zmiana na:
class FilterHeader extends Component {
    render() {
        return (
            <div>
             <FilterLink filter='all'>All</FilterLink>
             <FilterLink filter='active'>Active</FilterLink>
             <FilterLink filter='completed'>Completed</FilterLink>
            </div>
        );
    }
}
```
```javascript
// containers/FilterLink.js

// Był:
import {connect} from 'react-redux';
import Link from "../components/Link";
import {setVisibilityFilter} from "../actions/visibilityFilter";

const mapStateToProps = (state, ownProps) => ({
    active: state.visibilityFilter === ownProps.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(setVisibilityFilter(ownProps.filter));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Link);

// Zmiana na:
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Icon} from "semantic-ui-react";

class FilterLink extends Component {

    render() {
        const {children, filter} = this.props;

        return (
            <NavLink
                to={filter === 'all' ? '' : '/' + filter}
                activeStyle={{
                    textDecoration: 'none',
                    color: 'black'
                }}
            >
                <Button size="small"><Icon/>{children}<Icon/></Button>
            </NavLink>

        )
    };
}

FilterLink.propTypes = {
    filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
    children: PropTypes.node.isRequired,
};

export default FilterLink;
```

Krok 2. Przekazanie kontekstu aplikacji w parametrze filter. Inaczej przekierowanie URL aplikacji na BASE_URL/all spowoduje że w komponencie App jestem w stanie
odczytać kontekst all z parametru match.params.filter. Parametr ten przekazany do komponentu VisibleTodoList który steruje wyświetlaniem todos w zależności od filtra
który nie jest już zczytywany ze state aplikacji a z kontekstu URL 
```javascript
// components/Root.js
const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/:filter?" render={props => <App {...props} />}/>
        </BrowserRouter>
    </Provider>
);

// components/App.js
// Przekazuje do VisibleTodoList bieżący kontekst aplikacji 
class App extends Component {

    render() {
        const {match} = this.props;
        return (
            <div>
                ...
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Grid.Column>
                                <VisibleTodoList filter={match.params.filter || 'all'}/>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}
```

```javascript
// containers/VisibleTodoList.js
// Był:
const getVisibleTodos = (todos, filter) => {
   ...
};
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};
...
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);


// Zmiana na:
//nie ma pobrania ustawień filtra ze state a z własnych props przekazanych z App 
const getVisibleTodos = (todos, filter) => {
   ...
};
const mapStateToProps = (state, ownProps) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            ownProps.filter
        )
    };
};
...
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

Ponieważ cała obsługa filtrowania została zmieniona ze stanu aplikacji przeszła na kontekst URL w aplikacji modyfikacji uległ reduktor i akcje.
```javascript
// reducers/todos.js 
import {combineReducers} from 'redux';

const todos = (state = [], action) => {
    ...
};
const todo = (state, action) => {
    ....
};

/* USUNIĘTO:
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};
*/

const todoApp = combineReducers({
    todos: todos,
    //USUNIĘTO: visibilityFilter: visibilityFilter
});

export default todoApp;
```
Usunięto zbędna plik reprezentujący akcję visibilityFilter.js  
```javascript
// actions/visibilityFilter.js 
export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});
```




<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/23-todoapps-add-react-router/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/25-.../README.md)
 </sub>