import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Icon} from "semantic-ui-react";

class FilterLink extends Component {

    render() {
        const {children, filter} = this.props;
        return (
            <NavLink to={filter === 'all' ? '' : '/' + filter}>
                <Button size="small"><Icon/>{children}<Icon/></Button>
            </NavLink>
        )
    };
}


FilterLink.propTypes = {
    filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
    children: PropTypes.node.isRequired,
};

export default FilterLink;
