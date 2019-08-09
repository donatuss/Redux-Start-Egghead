import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

class AddTodo extends Component {

    render() {
        const {onAddClick} = this.props;
        let input;
        let random = 'E.' + Math.ceil(1000 * Math.random());

        return (
            <div>
                <div className="ui input">
                    <input
                        ref={node => {
                            input = node
                        }}
                        type='text'
                        defaultValue={'E.' + Math.ceil(1000 * Math.random())}/>
                </div>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <Button name="btnAddTodo" onClick={() => {
                    onAddClick(input.value);
                    input.value = random;
                }}>
                    AddTodo
                </Button>
            </div>
        );
    }
}

export default AddTodo;