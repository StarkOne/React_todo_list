import React from 'react';
import TodolistItem from '../todo-list-item/index';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

  const elements = todos.map(({ id, label, important, done, search}) => {
    if (search) {
      return (
        <li key={id} className="list-group-item">
          <TodolistItem
            label={label}
            important={important}
            done={done}
            onDeleted={() => {
              onDeleted(id)
            }}
            onToggleImportant = {() => {
              onToggleImportant(id);
            }}
            onToggleDone = {() => {
              onToggleDone(id)
            }}
          />
        </li>
      );
    }
  })

  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  );
}

export default TodoList;