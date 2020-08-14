import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'

import './app.css';

class App extends Component {
  
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'active' //active, all, done
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const index = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)        
      ];

      return {
        todoData: newArray
      }
    });
  };

  addItem = (text) => {

    this.setState(({todoData}) => {
			const newItem = this.createTodoItem(text);

			const data = [
				...todoData,
				newItem
			]
			
			console.table(data);

			return {
				todoData: data
			}
    });
  }

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);

    const oldItem = arr[index];
    
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index + 1)        
    ];
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    })
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    })
  }

  search = (items, term) => {
    if(term.length === 0) {
      return items;
    }

    return items.filter((el) => el.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  filter = (items, filter) => {
    if(filter === 'active') {
      return items.filter((el) => !el.done);
    } else if(filter === 'done') {
      return items.filter((el) => el.done);
    } else {
      return items;
    }
  }

  onSearch = (term) => {
    this.setState({
      term
    })
  }

  onFilterChange = (filter) => {
    this.setState({
      filter
    })
  }

  render() {

    const {todoData, term, filter} = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter onFilterChange={this.onFilterChange} filter={filter}/>
        </div>
  
        <TodoList 
          todos={visibleItems} 
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}/>
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
}

export default App;