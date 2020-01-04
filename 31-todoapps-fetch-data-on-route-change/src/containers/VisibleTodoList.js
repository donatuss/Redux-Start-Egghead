import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from "../components/TodoList";
import {toggleTodo} from "../actions/todo";
import {getVisibleTodos} from "../reducers";
import {fetchTodos} from "../api";

class VisibleTodoList extends Component {

    componentDidMount() {
        fetchTodos(this.props.filter).then(x => console.log("Todos From Fake DB", x));
    }

    componentDidUpdate(prevProps){
        if(prevProps.filter !== this.props.filter){
            fetchTodos(this.props.filter).then(x => console.log("Todos From Fake DB", x));
        }
    }
    render() {
        return <TodoList {...this.props}/>
    }
}

const mapStateToProps = (state, param) => {
    const filter = param.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
};

export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(VisibleTodoList));