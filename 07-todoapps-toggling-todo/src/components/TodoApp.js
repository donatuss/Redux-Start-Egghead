import React, {Component} from 'react';
import {Container, Grid, Divider, Label, Button, Input} from 'semantic-ui-react';


class TodoApp extends Component {

    constructor() {
        super();
        this.state = {
            txt1: 'E.' + Math.ceil(1000 * Math.random())
        };
    }

    componentWillMount() {
        const {store} = this.props;

        // callback after action
        store.subscribe(() => {
            this.setState({txt1: this.rTxt1['inputRef'].current.value});
            this.rTxt1['inputRef'].current.value = "";
        });

    }

    handleClick = (e) => {
        const {store} = this.props;
        const v4 = require('uuid/v4');

        let _text =  e;
        if(this.rTxt1['inputRef'].current.value.trim() !== ""){
            _text = this.rTxt1['inputRef'].current.value;
        }
        console.log("BEFORE", store.getState());

        store.dispatch({
            type: 'ADD_TODO',
            id: v4(),
            text: _text
        });

        console.log("AFTER", store.getState());
    };

    onTodoClick = (id) => {
        const {store} = this.props;

        console.log("BEFORE", store.getState());

        store.dispatch({
            type: 'TOGGLE_TODO',
            id
        });

        console.log("AFTER", store.getState());
    };

    render() {
        let random = 'E.' + Math.ceil(1000 * Math.random());

        return (
            <div>
                <Container fluid>
                    <Divider/>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Input ref={node => this.rTxt1 = node} input={<input/>} type='text'/>
                            <span style={{width: '5px', display: 'inline-block'}}/>
                            <Button name="btnAddTodo" onClick={this.handleClick.bind(null, random)}>
                                AddTodo - {random}
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Label.Group tag>
                                {this.props.store.getState().map((x) =>
                                    <Label as='a'  onClick={() => this.onTodoClick(x.id)} style={{textDecoration: x.completed ? 'line-through' : 'none'}} key={x.id}>{x.text}</Label>
                                )}
                            </Label.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default TodoApp;