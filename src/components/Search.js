import React, { Component } from 'react';

export default class Search extends Component {

  state = {
    search: ''
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state);
  };

  render() {
    const { search } = this.state;

    return (
      <form className="search-form" onSubmit={event => this.handleSubmit(event)}>
        <input value={search} onChange={this.handleChange}/>
        <button>Search</button>
      </form>
    );
  }
}