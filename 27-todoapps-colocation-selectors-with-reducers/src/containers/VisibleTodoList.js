import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from "../components/TodoList";
import {toggleTodo} from "../actions/todo";
import {getVisibleTodos} from "../reducers";


const mapStateToProps = (state, {match: {params: {filter}}}) => {
    return {
        todos: getVisibleTodos(
            state,
            filter || "all"
        )
    };
};

export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(TodoList));