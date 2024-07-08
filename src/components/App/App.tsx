import styles from './App.module.scss'
import Search from '../Search/Search'
import { Component } from 'react'
import API, { Man } from '../../api/api'
import Results from '../Results/Results'
import loader from './../../assets/img/Spinner.svg'

interface State {
  results: Man[]
  isLoading: boolean
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props)
    this.state = {
      results: [],
      isLoading: false,
    }
  }
  async componentDidMount(): Promise<void> {
    try {
      this.setState({ isLoading: true })
      const newState: Man[] = await API.getAllPeople()
      this.setState({ results: newState })
    } catch (error) {
      console.error("Can't load api:", error)
    } finally {
      this.setState({ isLoading: false })
    }
  }
  handleSearch = async (query: string): Promise<void> => {
    const response = await API.searchPeople(query)
    this.setState({ results: response })
    console.log('🚀 ~ App ~ handleSearch= ~ response:', response)
  }
  render() {
    return (
      <>
        <div className={styles.header}>
          <Search onSearch={this.handleSearch} />
        </div>
        <div className={styles.footer}>
          {this.state.isLoading ? (
            <img src={loader} alt="Loading..." />
          ) : (
            <Results response={this.state.results} />
          )}
        </div>
      </>
    )
  }
}

export default App
