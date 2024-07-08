import styles from './App.module.scss'
import Search from '../Search/Search'
import { Component } from 'react'
import API, { Man } from '../../api/api'
import Results from '../Results/Results'
import loader from './../../assets/img/Spinner.svg'
import errorImg from './../../assets/img/Error_icon.svg'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

interface State {
  results: Man[]
  isLoading: boolean
  isError: boolean
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props)
    this.state = {
      results: [],
      isLoading: false,
      isError: false,
    }
  }
  async componentDidMount(): Promise<void> {
    this.handleSearch()
  }
  handleSearch = async (query?: string): Promise<void> => {
    const searchQuery = query || localStorage.getItem('query')
    try {
      this.setState({ isLoading: true })
      const newState: Man[] = searchQuery
        ? await API.searchPeople(searchQuery)
        : await API.searchPeople('')
      this.setState({ results: newState })
    } catch (error) {
      this.setState({ isError: true })
      console.error("Can't load api:", error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  handleClick = (): void => {
    this.setState({ isError: true })
    throw new Error('Custom error')
  }

  render() {
    if (this.state.isError) {
      return (
        <div className={styles.error}>
          <img src={errorImg} alt="Error" />
          <h1 className={styles.errorText}>Something went wrong</h1>
        </div>
      )
    }
    return (
      <>
        <ErrorBoundary>
          <div className={styles.header}>
            <Search onSearch={this.handleSearch} />
            <button onClick={this.handleClick}>Throw error</button>
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div className={styles.body}>
            {this.state.isLoading ? (
              <img src={loader} alt="Loading..." />
            ) : (
              <Results response={this.state.results} />
            )}
          </div>
        </ErrorBoundary>
      </>
    )
  }
}

export default App
