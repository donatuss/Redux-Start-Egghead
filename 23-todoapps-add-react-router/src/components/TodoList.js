import React, {Component} from 'react';
import {Label} from 'semantic-ui-react';
import Todo from './Todo';

class TodoList extends Component {

    render() {
        const {todos, onTodoClick} = this.props;

        return <Label.Group tag>
            {todos.map((x) =>
                <Todo onClick={() => onTodoClick(x.id)} key={x.id} {...x}/>
            )}
        </Label.Group>

    };
}

export default TodoList;