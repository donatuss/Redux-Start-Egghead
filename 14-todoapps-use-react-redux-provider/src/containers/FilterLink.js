import React, {Component} from 'react';
import Link from "../components/Link";
import {ReactReduxContext} from 'react-redux';


class FilterLink extends Component {
    static contextType = ReactReduxContext;

    onFilterClick = (filter) => {
        const {store} = this.context;

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
        });
        console.log("AFTER", store.getState());
    };

    render() {
        const {store} = this.context;
        const {visibilityFilter} = store.getState();
        const {filter, children} = this.props;

        return <Link
            active={filter === visibilityFilter}
            onClick={this.onFilterClick.bind(this, filter)}>

            {children}
        </Link>
    };
}

export default FilterLink;