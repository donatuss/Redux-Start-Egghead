import {connect} from 'react-redux';
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

const mapStateToProps = (state, ownProps) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            ownProps.filter
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


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);