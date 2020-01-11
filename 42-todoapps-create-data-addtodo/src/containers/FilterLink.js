import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Icon} from "semantic-ui-react";

class FilterLink extends Component {

    render() {
        const {children, filter, match} = this.props;
        const routefilter = match.params.filter;
        const active = (filter === routefilter) || (filter === 'all' && routefilter === undefined);

        return (
            <NavLink to={filter === 'all' ? '' : '/' + filter}>
                {active ? <Button active size="small"><Icon name='checkmark'/>{children}<Icon/></Button> : <Button size="small"><Icon/>{children}<Icon/></Button>}
            </NavLink>
        )
    };
}

FilterLink.propTypes = {
    filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
    children: PropTypes.node.isRequired,
};

export default withRouter(FilterLink);
