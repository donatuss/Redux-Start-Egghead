## 38 Todos Aplikacja - Część 33 - Wyświetlenie informacji ładowania danych
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Z poziomu komponentu ``VisibleTodoList`` w obecnej chwili wywołujemy 2 akcje (dokładniej 2 funkcję tworzącą akcję)
```javascript
//containers/VisibleTodoList.js
import * as actions from "../actions";

componentDidMount() {
    this.fetchData();
}

fetchData() {
    const {filter, fetchTodos, requestTodos} = this.props;
    requestTodos(filter);
    fetchTodos(filter);
}

export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
```
Tak nie powinno być. Akcja wysłania żądania todos requestTodos powinna zostać razem z pobraniem todos fetchTodos. Powinna ona ustawić informację
w state aplikacji o dokonywaniu pobrania danych todos od momentu startu do pełnego otrzymania todos z back-endu - czyli momentu wygenerowania akcji 
fetchTodos. <br/>
Przypomnijmy sobie jak skonstruowana jest funkcja tworząca akcje fetchTodos oraz przypomnijmy
```javascript
//actions/todo.js
const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});

export const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
});

export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response)
    );
```
Zauważmy że funkcja ta nie zwraca nam plain obiektu a zwraca nam Promise który w zależności od filtru w momencie pozytywnego wykonania zwróci mi obiekt akcji.
Żeby obsłużyć z poziomu stora ten typ "akcji" opakowaliśmy standardową funkcję dispach w taki sposób aby obsługiwała Promises
```javascript
configureStore.js
const addPromiseSupportToDispatch = (store) => {
    
    /*
    Tutaj oryginalny dispach - czyli funkcja dispach przyjmująca akcje i 
    dzięki temu modyfikująca state aplikacji
    */
    const rawDispatch = store.dispatch;

    return (action) => {
        
        /*
        Jeżeli Promise to mam funkcje której argumentem jest akcja która przecież jest Promisem
        ale zwrotem jest wykonanie oryginalnego rawDispatch po pozytywnym wykonaniu Promise (na tym czymś co ten promise zwróci 
        patrz przykład js poniżej)
        */
        if(typeof action.then === 'function'){
            return action.then(rawDispatch)
        }
        
        /*
        //Jeżeli to nie Promise to zwracana jest funkcja która przyjmuje akcje a rawDispatch(action) 
        czyli jest to równoważne po prostu oryginalnej store.dispatch (rawDispatch)    
        */
        return rawDispatch(action);
    };
};

const configureStore = () => {
    const store = createStore(todoApp);
    store.dispatch = addPromiseSupportToDispatch(store);
    return store;
};


/* ----------------------------------------------------------
| Przykład obrazujący return action.then(rawDispatch) 
------------------------------------------------------------*/
myPromise = (filter) => {
    return new Promise((resolve, reject) => {
        Math.random() > filter ? resolve({status: 1}): reject({status: 0});
    })
};

const dispatch = x => {
    let myActionResult =  {...x, status: x.status + 100};
    console.log("myActionResult", myActionResult);
    return myActionResult;
};

myPromise(0.1)
.then(data => data).then(dispatch)
.catch(err => console.log("error :", err));

//Output konsoli: myActionResult { status: 101 }
/*------------------------------------------------------------*/
``` 
Zmodyfikujemy teraz twórce akcji ``receiveTodos`` tak aby wywołała sekwencją akcji requestTodos i obecnej receiveTodos

```javascript
//actions/todo.js

/* Było:
export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response)
    );
*/

/* 
Przykład :
const dispatch = x => {...x, status: x.status + 100};
const f = (x) => g => { return g(x) };
f({status: 200})(dispatch); //zwrot {status: 300}


Poniższa struktura prezentuje tzw thunk. Thunk to funkcja zwracana z innej funkcji. 
W tym przypadku właśnie twórca akcji fetchTodos zamiast plain js object zwrócił mi 
thunk czyli funkcję - którą określiłem nazwą dispatch (można dowolnie).
Ponieważ tata struktura akcji nie jest dopuszczalna (tylko plain js object) 
- w middleware store trzeba będzie rozszerzyć obsługą standardowego dispatch reduxowego o thunk-i. 
Jest:
*/
export const fetchTodos = (filter) => dispatch => {
    
    dispatch(requestTodos(filter));
    
    return api.fetchTodos(filter).then(response =>
        dispatch(receiveTodos(filter, response))
    );
    
    //Można to zapisać:
    //return api.fetchTodos(filter).then(response => receiveTodos(filter, response)).then(dispatch);
}

```
Dodajemy obsługa thunks w middleware
```javascript
//store/configureStore.js

/*
Kluczem do zrozumienia tej konstrukcji jet to że pod next jest ukryty oryginalna funkcja dipach (store.dipatch)
I teraz w przypadku gdy twórca akcji jest zwykła funkcja zwracająca plain js object to poniższa funkcja 
zwróci na funkcję  przyjmując (action) => next(action) czyli nic innego jak oryginalna  store.dipatch (next=store.dipatch)

W przypadku gdy twórca akcji zwraca nam funkcje (czyli rzeczywistego thunk-a) to struktura zwróci nam funkcję której wynikiem 
będą działania oryginalnego dispatch zgodnie z jej definicją. 

W naszym przypadku fetchTodos będzie to funkcja która dokona 
- w pierwszej kolejności oryginalnego dispach na akcji requestTodos(filter) = {type: 'REQUEST_TODOS', filter}
- a w drugiej kolejności oryginalnego dispach na akcji receiveTodos(filter, response) = {type: 'RECEIVE_TODOS', filter, response}   
   
*/
const thunk = (store) => next => action => {
  if (typeof action === 'function') {
        return action(next);
    }
    return next(action);
};

const configureStore = () => {
    const middlewares = [promise, thunk];
    ...
    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );
};
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/38-todoapps-loading-indicators/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/40-.../README.md)
 </sub>