## 16 Todos Aplikacja - Część 11 - Redux-React connect - przekazanie danych do komponentów prezentacji
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 11 aplikacji Todos - Zmiana komponentu kontenera AddTodo. Użycie funkcji connect z react-redux.
Do do docelowego komponentu prezentacji (jest zarówno komponentem kontenerem) AddTodo jako właściwość - dostarczymy mu funkcje dispatch. 
Funkcja dispatch jest potrzebna komponentowi do wydelegowania akcji dodania Todo           

```javascript
//AddTodo.js
class AddTodo extends Component {

    onClick = () => {
        const {dispatch} = this.props;
        const v4 = require('uuid/v4');
        dispatch({
            type: 'ADD_TODO',
            id: v4(),
            text: this.input.value
        });
        this.input.value = 'E.' + Math.ceil(1000 * Math.random());
    };

    render() {
        let random = 'E.' + Math.ceil(1000 * Math.random());
        return (
            <div>
                <div className="ui input">
                    <input
                        ref={node => {
                            this.input = node
                        }}
                        type='text'
                        defaultValue={random}
                        onChange={(e) => {
                            this.input.value = e.target.value
                        }}/>
                </div>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <Button name="btnAddTodo" onClick={this.onClick.bind(this)}>
                    AddTodo
                </Button>
            </div>
        );
    }
}

export default connect()(AddTodo);
```

```javascript
//1. równoważny przykład connect
export default connect(null, null)(AddTodo);

//2. równoważny przykład connect
export default connect(
    (state) => {
        return {};
    },
    (dispatch) => {
        return {
            dispatch
        };
    })(AddTodo)

//3. równoważny przykład connect
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);

```
 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/15-todoapps-react-redux-connect/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/17-todoapps-react-redux-connect-3/README.md)
 </sub>