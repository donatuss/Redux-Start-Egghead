import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';

class FilterLink extends Component {

    render() {
        const {store, filter, currentFilter} = this.props;

        if (filter === currentFilter) {
            return <Button active size="small"><Icon name='checkmark'/>{this.props.children}<Icon /></Button>
        }

        return (
            <a  href='#?' onClick={e => {
                e.preventDefault();
                console.log("BEFORE", store.getState());
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                });
                console.log("AFTER", store.getState());
            }}>
                <Button size="small"><Icon/>{this.props.children}<Icon /></Button>
            </a>
        )
    };
}

export default FilterLink;