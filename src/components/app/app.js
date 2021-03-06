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
      ],
      filter: 'all',
      term: ''
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
    return { label: label, important: false, done: false, id: this.number++ }
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
/*   onChangeList = (text) => {
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
  } */
/*   toggoleClinkBtn = (text) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData].map((item) => {
        switch (text) {
          case 'allItem':
            item.search = true;
            break;
          case 'active':
            if (!item.done) {
              item.search = true;
            } else {
              item.search = false;
            }
            break;
          case 'done':
            if (item.done) {
              item.search = true;
            } else {
              item.search = false;
            }
            break;
          default:
            break;
        }
        return item;
      })
      return {
        todoData: newArr
      }
    });
  }
  activeBtnToggle = (text) => {
    switch (text) {
      case 'allItem':
        this.setState({
          showBtn: 'allItem'
        })
        break;
      case 'active':
        this.setState({
          showBtn: 'active'
        })
        break;
      case 'done':
        this.setState({
          showBtn: 'done'
        })
        break;
      default:
        break;
    }
  }
 */
  filter(items, filter) {

    switch (filter) {
      case 'all':
        return items;
        break;
      case 'active':
        return items.filter((item) => {
          return !item.done;
        });
        break;
      case 'done':
        return items.filter((item) => {
          return item.done;
        });
        break;
      default:
        return items;
        break;
    }

  }

  search(items, term) {
    if(term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }
  onSearchChange = (term) => {
    this.setState({
      term
    });
  }
  onFilterChange = (filter) => {
    this.setState({
      filter
    });
  }

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem itemAdd={this.AddItemList}/>
      </div>
    );
  }
};