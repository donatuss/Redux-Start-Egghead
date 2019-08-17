## 19 Todos Aplikacja - Część 14 - Uproszczenie zapisu funkcji wykorzystujących notacje strzałkową
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Poniżej skrócone zapisy juz zdefiniowanych funkcji        

```javascript
// actions/todo.js BYŁO
export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: v4(),
        text
    };
};

// JEST
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});
```

```javascript
//FilterLink.js BYŁO
const mapStateToProps = (state, ownProps) => {
    return {
        active: state.visibilityFilter === ownProps.filter
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    };
};

//FilterLink.js JEST
const mapStateToProps = (state, ownProps) => ({
    active: state.visibilityFilter === ownProps.filter
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(setVisibilityFilter(ownProps.filter));
    }
});
```
<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/18-todoapps-extracting-action/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/20-todoapps-initial-state/README.md)
 </sub>