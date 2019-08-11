import React, {Component} from 'react';
import TodoList from "../components/TodoList";

class VisibleTodoList extends Component {

    getVisibleTodos = (todos, filter) => {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_COMPLETED':
                return todos.filter(
                    t => t.completed
                );
            case 'SHOW_ACTIVE':
                return todos.filter(
                    t => !t.completed
                );
            default:
                return todos;
        }
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
        const {store} = this.props;

        const {todos, visibilityFilter} = store.getState();
        const visibleTodos = this.getVisibleTodos(
            todos,
            visibilityFilter,
        );

        return <TodoList
            todos={visibleTodos}
            onTodoClick={this.onTodoClick}>
        </TodoList>
    };
}

export default VisibleTodoList;