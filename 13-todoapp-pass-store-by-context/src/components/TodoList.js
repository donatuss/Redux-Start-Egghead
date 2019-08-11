import React from 'react';
import {Label} from 'semantic-ui-react';
import Todo from './Todo';

const TodoList = ({todos, onTodoClick}) => (
    <Label.Group tag>
        {todos.map((x) =>
            <Todo onClick={() => onTodoClick(x.id)} key={x.id} {...x}/>
        )}
    </Label.Group>
);

export default TodoList;