## React i Redux na przykładzie aplikacji Counter 
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Poniżej prosty przykład aplikacji używającej React i Redux.

```javascript
import React, {Component} from 'react';
import {createStore} from 'redux';

/* funkcja reducer */ 
const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};

/* Redux store */
const store = createStore(counter);

/* klasa React - Counter */
class Counter extends Component {
    
    /* W konstruktorze rejestrowane są w Redux store 2 funkcje  
       logująca i zmieniająca stan komponentu Counter co wymusi
       w konsekwencji ponowne jego wyrenderowanie. 
    */
    constructor() {
        super();
        this.state = {
            counter_value: 0
        };

        store.subscribe(() => console.log("Poprzedni/Aktualny: ", 
            this.state.counter_value + " / " + store.getState()));
        
        store.subscribe(() => this.setState({counter_value: store.getState()}));
    }

    /* funkcje realizująca delegowanie akcji  */
    onIncrement = () => {
        store.dispatch({
            type: "INCREMENT"
        });
    };
    onDecrement = () => {
        store.dispatch({
            type: "DECREMENT"
        });
    };

    render() {
        let {counter_value} = this.state;

        return (
            <div>
                <h1>{counter_value}</h1>
                <button onClick={this.onIncrement}>+</button>
                <button onClick={this.onDecrement}>-</button>
            </div>
        )
    }
}
 ```
 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/02-store-basics/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/04-immutable/README.md)
 </sub>