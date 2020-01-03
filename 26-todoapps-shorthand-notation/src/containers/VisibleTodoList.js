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

const mapStateToProps = (state, {match: {params: {filter}}}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            filter || "all"
        )
    };
};

export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(TodoList));