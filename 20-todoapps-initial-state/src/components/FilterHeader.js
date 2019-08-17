import React, {Component} from 'react';
import FilterLink from "../containers/FilterLink";

class FilterHeader extends Component {

    render() {

        return (
            <div>
                <FilterLink {...this.props} filter='SHOW_ALL'>All</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink {...this.props} filter='SHOW_ACTIVE'>Active</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink {...this.props} filter='SHOW_COMPLETED'>Competed</FilterLink>
            </div>
        );
    }
}

export default FilterHeader;