import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {ReactReduxContext} from "react-redux";

class AddTodo extends Component {
    static contextType = ReactReduxContext;


    onClick = () => {
        const {store} = this.context;
        const v4 = require('uuid/v4');

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'ADD_TODO',
            id: v4(),
            text: this.input.value
        });
        console.log("AFTER", store.getState());
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

export default AddTodo;