import React, { ChangeEvent, Component } from 'react'
import styles from './Search.module.scss'
interface SearchProps {
  query: string
}

interface SearchState {
  query: string
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)
    this.state = {
      query: localStorage.getItem('searchTerm') || '',
    }
  }
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value })
  }
  handleSearch = () => {
    const { query } = this.state
    localStorage.setItem('query', query)
  }
  render() {
    return (
      <div className={styles['search-component']}>
        <input
          type="text"
          value={this.state.query}
          onInput={this.handleChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    )
  }
}
