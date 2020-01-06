import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from "../components/TodoList";
import * as actions from "../actions";
import {getVisibleTodos} from "../reducers";

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