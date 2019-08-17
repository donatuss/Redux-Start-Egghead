import React from 'react';
import {Label} from 'semantic-ui-react';

const Todo = ({onClick, completed, text}) => (
    <Label as='a'
           onClick={onClick}
           style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
    </Label>
);

export default Todo;