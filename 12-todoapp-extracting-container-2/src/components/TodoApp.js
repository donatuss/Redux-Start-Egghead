import React, {Component} from 'react';
import {Container, Divider, Grid} from 'semantic-ui-react';
import AddTodo from "../containers/AddTodo";
import FilterHeader from "./FilterHeader";
import VisibleTodoList from "../containers/VisibleTodoList";


class TodoApp extends Component {

    constructor() {
        super();
        this.state = {
            txt1: 'E.' + Math.ceil(1000 * Math.random())
        };
    }

    componentDidMount() {
        const {store} = this.props;
        //callback after action
        this.unsubscribe = store.subscribe(() => {
            //force render
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <Divider/>
                    <Divider/>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <FilterHeader {...this.props}/>
                        </Grid.Column>
                    </Grid>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <AddTodo {...this.props}/>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Grid.Column>
                                <VisibleTodoList {...this.props}/>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default TodoApp;