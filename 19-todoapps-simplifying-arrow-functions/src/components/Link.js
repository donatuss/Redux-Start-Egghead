import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';

class Link extends Component {

    render() {
        const {children, active, onClick} = this.props;

        if (active) {
            return <Button active size="small"><Icon name='checkmark'/>{children}<Icon/></Button>
        }

        return (
            <a href='#?' onClick={e => {
                e.preventDefault();
                onClick()
            }}>
                <Button size="small"><Icon/>{children}<Icon/></Button>
            </a>
        )
    };
}

export default Link;