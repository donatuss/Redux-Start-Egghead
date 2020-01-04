import React from 'react';
import App from "./App";
import {Provider} from "react-redux";
import {BrowserRouter, Route} from 'react-router-dom'

const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/:filter?" render={props => <App {...props} />}/>
        </BrowserRouter>
    </Provider>
);

export default Root;