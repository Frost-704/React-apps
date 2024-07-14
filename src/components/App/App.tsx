import styles from './App.module.scss'
import Search from '../Search/Search'
import { useCallback, useEffect, useState } from 'react'
import API, { Endpoints, ManResponse } from '../../api/api'
import Results from '../Results/Results'
import loader from './../../assets/img/Spinner.svg'
import useSearchQuery from '../../hooks/useSearchQuery'
import Pagination from '../Pagination/Pagination'

interface State extends ManResponse {
  isLoading: boolean
  isError: boolean
}

const App = () => {
  const initialState: State = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    isLoading: false,
    isError: false,
  }
  const [state, setState] = useState<State>(initialState)
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
        console.log('🚀 ~ newState:', newState)
        setState({
          ...newState,
          isLoading: false,
          isError: false,
        })
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isError: true,
          isLoading: false,
        }))
        console.error("Can't load api:", error)
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
          <>
            <Results
              count={state.count}
              next={state.next}
              previous={state.previous}
              results={state.results}
            />
            <Pagination
              count={state.count}
              next={state.next}
              previous={state.previous}
            />
          </>
        )}
      </div>
    </>
  )
}

export default App
