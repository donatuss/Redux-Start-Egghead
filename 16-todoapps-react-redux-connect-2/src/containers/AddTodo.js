import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {connect} from 'react-redux';

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