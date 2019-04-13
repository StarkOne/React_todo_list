import React, { Component } from "react";
import './add-item.css'

export default class AddItem extends Component {
  render() {
    const { itemAdd } = this.props;
    return (
      <div className="add-item d-flex mt-2">
        <input type="text" className="form-control mr-1" />
        <button 
          className="btn btn-primary"
          onClick={() => {
            itemAdd('text')
          }}
        >Add</button>
      </div>
    );
  }
}