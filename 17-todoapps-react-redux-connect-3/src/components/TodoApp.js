import React, {Component} from 'react';
import {Container, Divider, Grid} from 'semantic-ui-react';
import AddTodo from "../containers/AddTodo";
import FilterHeader from "./FilterHeader";
import VisibleTodoList from "../containers/VisibleTodoList";


class TodoApp extends Component {

    render() {
        return (
            <div>
                <Container fluid>
                    <Divider/>
                    <Divider/>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <FilterHeader/>
                        </Grid.Column>
                    </Grid>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <AddTodo/>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Grid.Column>
                                <VisibleTodoList/>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default TodoApp;