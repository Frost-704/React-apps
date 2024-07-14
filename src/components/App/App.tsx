import styles from './App.module.scss'
import Search from '../Search/Search'
import { useCallback, useEffect, useState } from 'react'
import API, { Endpoints, ManResponse, Man } from '../../api/api'
import Results from '../Results/Results'
import loader from './../../assets/img/Spinner.svg'
import useSearchQuery from '../../hooks/useSearchQuery'

interface State {
  results: Man[]
  isLoading: boolean
  isError: boolean
}

const App = () => {
  const initialState: State = {
    results: [],
    isLoading: false,
    isError: false,
  }
  const [state, setState] = useState(initialState)
  const [query] = useSearchQuery()

  const handleSearch = useCallback(
    async (searchQuery?: string): Promise<void> => {
      const resultQuery = searchQuery ?? query
      localStorage.setItem('query', resultQuery)
      console.log(resultQuery)
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }))
        const newState: ManResponse = await API(Endpoints.people).searchPeople(
          resultQuery
        )
        setState((prevState) => ({ ...prevState, results: newState.results }))
      } catch (error) {
        setState((prevState) => ({ ...prevState, isError: true }))
        console.error("Can't load api:", error)
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }))
      }
    },
    [query]
  )

  useEffect(() => {
    handleSearch(query)
  }, [handleSearch, query])

  const handleClick = (): void => {
    setState((prevState) => ({ ...prevState, isError: true }))
  }

  if (state.isError) {
    throw new Error('Custom error')
  }

  return (
    <>
      <div className={styles.header}>
        <Search onSearch={handleSearch} />
        <button onClick={handleClick}>Throw error</button>
      </div>
      <div className={styles.body}>
        {state.isLoading ? (
          <img src={loader} alt="Loading..." />
        ) : (
          <Results response={state.results} />
        )}
      </div>
    </>
  )
}

export default App
