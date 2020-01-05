## 31 Todos Aplikacja - Część 26 - Pobranie danych (cd..) na poziomie komponentu w zależności od ustawionego routingu
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

W poprzedniej części dane z symulowanego backend-u były pobierane asynchronicznie i logowane na konsoli na poziomie konfiguracji store. 
Teraz utworzymy komponent React VisibleTodoList (w obecnej chwili to plik pośredniczący, ustawiający properties dla komponentu prezentacji TodoList).
Komponent ten potrafić będzie odczytać parametr filtr routingu jaki zostanie do niego przekazany z przeglądarki i w wyniku reakcji na ten parametr pobrać
dane z symulowanej bazy danych.  
```javascript
//containers/VisibleTodoList.js
// Był:
const mapStateToProps = (state, {match: {params: {filter}}}) => {
    return {
        todos: getVisibleTodos(state, filter || "all")
    };
};
export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(TodoList));
```
Poniżej zdefiniowany został komponent odwołując sie withRouter sam do siebie. Natomiast przekazuje do niego samego jak i komponentu TodoList parametr 
filter już po odczytaniu go z routingu  
```javascript
// Jest :
class VisibleTodoList extends Component {
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
export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(VisibleTodoList));
```
Poniżej wypisanie na konsoli danych z symulowanego backend-u w zależności od routingu.
```javascript
// Jest :
import {fetchTodos} from "../api";

class VisibleTodoList extends Component {

    componentDidMount() {
        fetchTodos(this.props.filter).then(x => console.log("Todos From Fake DB", x));
    }

    componentDidUpdate(prevProps){
        if(prevProps.filter !== this.props.filter){
            fetchTodos(this.props.filter).then(x => console.log("Todos From Fake DB", x));
        }
    }

    render() {
        return <TodoList {...this.props}/>
    }
}

export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(VisibleTodoList));
```
<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/30-todoapps-fake-asynch-backend/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/32-todoapps-dispach-with-fetch-data/README.md)
 </sub>