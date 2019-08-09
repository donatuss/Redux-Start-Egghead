import React, {Component} from 'react';
import FilterLink from "./FilterLink";

class FilterHeader extends Component {

    render() {
        const {visibilityFilter, onFilterClick} = this.props;

        return (
            <div>
                <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>Active</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>Competed</FilterLink>
            </div>
        );
    }
}

export default FilterHeader;