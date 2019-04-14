import React, { Component } from "react";
import './add-item.css'

export default class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      label: ''
    }
  }
  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    })
  }
  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.label) {
      this.props.itemAdd(this.state.label);
      this.setState({
        label: ''
      })
    } else {
      return false;
    }
  }

  render() {
    const { label } = this.state;
    return (
      <form className="add-item d-flex mt-2" onSubmit={this.onSubmit}>
        <input 
          type="text" 
          className="form-control mr-1"
          placeholder="What needs to be done"
          value={label}
          onChange={this.onLabelChange}
        />
        <button 
          className="btn btn-primary"
        >Add</button>
      </form>
    );
  }
}