import React, {Component} from 'react';
import {createStore} from 'redux';

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

const store = createStore(counter);

class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter_value: 0
        };

        store.subscribe(() => console.log("Poprzedni/Aktualny: ", this.state.counter_value + " / " + store.getState()));
        store.subscribe(() => this.setState({counter_value: store.getState()}));
    }

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


export default Counter;