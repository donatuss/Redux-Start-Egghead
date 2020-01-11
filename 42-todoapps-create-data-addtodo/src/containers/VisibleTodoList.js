import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from "../components/TodoList";
import * as actions from "../actions";
import {getVisibleTodos, getIsFetching, getErrorMessage} from "../reducers";
import FetchError from "../components/FatchError";

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
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }

    render() {
        const {toggleTodo, todos, isFetching, errorMessage} = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading ...</p>
        }
        if (errorMessage && !todos.length) {
            return <FetchError onRetry={() => this.fetchData()} message={errorMessage}/>
        }
        return <TodoList onTodoClick={toggleTodo} todos={todos}/>
    }
}

const mapStateToProps = (state, param) => {
    const filter = param.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
        filter
    };
};

export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));