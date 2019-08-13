import React from 'react';
import ReactDOM from 'react-dom';
import {ReactReduxContext} from 'react-redux';
import 'semantic-ui-css/semantic.min.css'

import TodoApp from './components/TodoApp';
import configureStore from './store/configureStore';

const store= configureStore();

ReactDOM.render(
    <ReactReduxContext.Provider value={{store:store}}>
        <TodoApp/>
    </ReactReduxContext.Provider>,
    document.getElementById('root')
);
