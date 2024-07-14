import styles from './App.module.scss'
import Search from '../Search/Search'
import { useCallback, useEffect, useState } from 'react'
import API, { Endpoints, ManResponse } from '../../api/api'
import Results from '../Results/Results'
import Pagination from '../Pagination/Pagination'
import Loader from '../Loader/Loader'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

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
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { manId } = useParams()
  const query = searchParams.get('query') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)

  const handleSearch = useCallback(
    async (searchQuery?: string, pageNumber: number = 1): Promise<void> => {
      const resultQuery = searchQuery ?? query
      setSearchParams({ query: resultQuery, page: pageNumber.toString() })
      navigate(`/?query=${resultQuery}&page=${pageNumber}`)
      console.log(
        'Executing search with query:',
        resultQuery,
        'and page:',
        pageNumber
      )
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }))
        const newState: ManResponse = await API(Endpoints.people).searchPeople(
          resultQuery,
          pageNumber
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
    [query, setSearchParams, navigate]
  )

  useEffect(() => {
    if (!manId) {
      handleSearch(query, page)
    }
  }, [handleSearch, query, page, manId])

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
          <Loader />
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
              onPageChange={(page: number) => handleSearch(query, page)}
            />
          </>
        )}
      </div>
    </>
  )
}

export default App
