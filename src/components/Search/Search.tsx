import { ChangeEvent, Component, FormEvent } from 'react'
import styles from './Search.module.scss'

interface SearchProps {
  onSearch: (query: string) => void
}

interface SearchState {
  query: string
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)
    this.state = {
      query: localStorage.getItem('query') || '',
    }
  }
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value })
  }
  handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { query } = this.state
    localStorage.setItem('query', query.trim().toLowerCase())
    this.props.onSearch(query.trim().toLowerCase())
  }
  render() {
    return (
      <form className={styles['search-component']} onSubmit={this.handleSearch}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    )
  }
}
