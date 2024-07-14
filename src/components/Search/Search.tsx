import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './Search.module.scss'

interface SearchProps {
  onSearch: (query: string) => void
}

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('query', query.trim().toLowerCase())
    onSearch(query.trim().toLowerCase())
  }
  return (
    <form className={styles['search-component']} onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default Search
