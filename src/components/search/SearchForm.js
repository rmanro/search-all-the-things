import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.css';

export default class SearchForm extends Component {

  static propTypes = {
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func.isRequired
  };

  state = {
    current: this.props.searchTerm || ''
  };

  UNSAFE_componentWillReceiveProps({ searchTerm }) {
    if(searchTerm !== this.state.current) {
      this.setState({ current: searchTerm || '' });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ current: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.callSearch();
  };

  callSearch() {
    const { current } = this.state;
    if(!current) return;
    this.props.onSearch(current);
  }

  render() {
    const { current } = this.state;

    return (
      <form className={styles.search} onSubmit={this.handleSubmit}>
        <fieldset>
          <input value={current}
            onChange={this.handleChange}
            name="search"
            placeholder="title or author"
            required/>
          <label>
            &nbsp;<button>Search</button>
          </label>
        </fieldset>
      </form>
    );
  }
}