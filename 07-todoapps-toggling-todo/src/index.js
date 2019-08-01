import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'

import TodoApp from './components/TodoApp';
import configureStore from './store/configureStore';

ReactDOM.render(
    <TodoApp store={configureStore()}/>,
    document.getElementById('root')
);
