import React, {Component} from 'react';
import FilterLink from "../containers/FilterLink";

class FilterHeader extends Component {
    render() {
        return (
            <div>
                <FilterLink filter='all'>All</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink filter='active'>Active</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink filter='completed'>Completed</FilterLink>
            </div>
        );
    }
}

export default FilterHeader;