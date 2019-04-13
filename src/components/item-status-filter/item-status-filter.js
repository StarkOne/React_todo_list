import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  checkBtnActive = (text) => {
    this.props.activeBtnToggle(text);
  }
  render() {
    const activeBtnShow = this.props.activeBtnShow;
    return (
      <div className="btn-group">
        <button 
          type="button"
          className={`btn ${activeBtnShow === 'allItem' ? 'btn-info' : 'btn-outline-secondary'}`}
          onClick={() => {
            this.checkBtnActive('allItem')
            this.props.toggoleClinkBtn('allItem')
          }} 
        >All</button>
        <button type="button"
          className={`btn ${activeBtnShow === 'active' ? 'btn-info' : 'btn-outline-secondary'}`}
          onClick={() => {
            this.checkBtnActive('active')
            this.props.toggoleClinkBtn('active')
          }}
          >Active</button>
        <button type="button"
          className={`btn ${activeBtnShow === 'done' ? 'btn-info' : 'btn-outline-secondary'}`}
          onClick={() => {
            this.checkBtnActive('done')
            this.props.toggoleClinkBtn('done')
          }}
          >Done</button>
      </div>
    );
  }
}

