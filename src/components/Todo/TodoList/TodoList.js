import TodoItem from "../TodoItem/TodoItem";

import "./TodoList.scss";

function TodoList({ username, todoList, onUpdateTodo, onDeleteTodo }) {
  return (
    <div className="todo-list">
      <h2 className="todo-list__header">
        {username?.toUpperCase()}'s Todo List ({todoList.length})
      </h2>
      {todoList.length > 0 ? (
        todoList.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))
      ) : (
        <p className="todo-list__placeholder">
          There is no todo item in the list - start adding to the list.
        </p>
      )}
    </div>
  );
}

export default TodoList;
