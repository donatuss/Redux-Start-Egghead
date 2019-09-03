import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from "../components/TodoList";
import {toggleTodo} from "../actions/todo";


const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(
                t => t.completed
            );
        case 'active':
            return todos.filter(
                t => !t.completed
            );
        default:
            return new Error(`Unknown filter: ${filter}`);
    }
};

const mapStateToProps2 = (state, param) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            param.match.params.filter || "all"
        )
    };
};

const mapStateToProps3 = (state, {match}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            match.params.filter || "all"
        )
    };
};

const mapStateToProps4 = (state, {match: {params}}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            params.filter || "all"
        )
    };
};

const mapStateToProps = (state, {match: {params: {filter}}}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            filter || "all"
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));