import React, {Component} from 'react';
import Link from "../components/Link";

class FilterLink extends Component {

    onFilterClick = (filter) => {
        const {store} = this.props;

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
        });
        console.log("AFTER", store.getState());
    };

    render() {
        const {store, filter, children} = this.props;
        const {visibilityFilter} = store.getState();

        return <Link
            active={filter === visibilityFilter}
            onClick={this.onFilterClick.bind(this, filter)}>

            {children}
        </Link>
    };
}

export default FilterLink;