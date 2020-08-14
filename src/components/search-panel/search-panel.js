import React, { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
  
  state = {
    term: ''
  }

  onLabelChange = (e) => {
    this.setState({
      term: e.target.value
    })
    
    this.props.onSearch(e.target.value);
  }

  render() {

    return (
      <input 
        type="text"
        className="form-control search-input"
        placeholder="type to search" 
        onChange={this.onLabelChange}
        value={this.state.term}
        />
    );
  } 
};

export default SearchPanel;
