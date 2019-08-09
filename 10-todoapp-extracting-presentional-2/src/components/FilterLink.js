import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';

class FilterLink extends Component {

    render() {
        const {filter, currentFilter, onClick} = this.props;

        if (filter === currentFilter) {
            return <Button active size="small"><Icon name='checkmark'/>{this.props.children}<Icon/></Button>
        }

        return (
            <a href='#?' onClick={e => {
                e.preventDefault();
                onClick(filter)
            }}>
                <Button size="small"><Icon/>{this.props.children}<Icon/></Button>
            </a>
        )
    };
}

export default FilterLink;