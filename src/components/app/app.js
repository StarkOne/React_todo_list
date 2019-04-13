import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {
  number = 0
  
  constructor() {
    super();
    this.state = {
      todoData : [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch appsp'),
      ]
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => {
        return item.id !== id 
      });
      return {
        todoData: newArr
      }
    })
  }

  createTodoItem(label) {
    return { label: label, important: false, done: false, search: true, id: this.number++ }
  }
  findIndexItem(id) {
    return this.state.todoData.findIndex((item) => {
      return item.id === id;
    });
  }

  AddItemList = (text) => {
    this.setState(({todoData}) => {
      const newArr = [...todoData];
      newArr.push(this.createTodoItem(text));
      return {
        todoData: newArr
      }
    })
  }

  toggoleProperty(arr, id, propName) {
    const index = this.findIndexItem(id);
    const newArr = [...arr];
    newArr[index][propName] = !newArr[index][propName];
    return newArr
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggoleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggoleProperty(todoData, id, 'done')
      }
    })
  }
  onChangeList = (text) => {
    this.setState(({todoData}) => {
      const copeArr = [...todoData];
      const newArr = copeArr.map((item) => {
        if (!item.label.toLowerCase().includes(text.toLowerCase())) {
          item.search = false;
        } else {
          item.search = true;
        }
        return item;
      });
      return {
        todoData: newArr
      }
    })
  }

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onChangeList={this.onChangeList}/>
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem itemAdd={this.AddItemList}/>
      </div>
    );
  }
};