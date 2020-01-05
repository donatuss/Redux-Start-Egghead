import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from "../components/TodoList";
import * as actions from "../actions";
import {getVisibleTodos} from "../reducers";
import {fetchTodos} from "../api";

class VisibleTodoList extends Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const {filter, receiveTodos} = this.props;
        fetchTodos(filter).then(todos => receiveTodos(filter, todos));
    }

    render() {
        const {toggleTodo, ...rest} = this.props;
        return <TodoList onTodoClick={toggleTodo} {...rest}/>
    }
}

const mapStateToProps = (state, param) => {
    const filter = param.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
};

export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));