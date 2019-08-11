import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'

import TodoApp from './components/TodoApp';
import Provider from './store/Provider';
import configureStore from './store/configureStore';

ReactDOM.render(
    <Provider store={configureStore()}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);
