import { ChangeEvent, FormEvent } from 'react'
import styles from './Search.module.scss'
import useSearchQuery from '../../hooks/useSearchQuery'

interface SearchProps {
  onSearch: (query: string) => void
}

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useSearchQuery()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
