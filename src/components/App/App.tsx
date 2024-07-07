import styles from './App.module.scss'
import Search from '../Search/Search'
import { Component } from 'react'
import { getAllPeople, Man } from '../../api/api'
import Results from '../Results/Results'

interface Response {
  results: Man[]
}

class App extends Component<object, Response> {
  constructor(props: object) {
    super(props)
    this.state = {
      results: [],
    }
  }
  async componentDidMount(): Promise<void> {
    const newState: Man[] = await getAllPeople()
    this.setState({ results: newState })
  }
  handleSearch = (query: string): void => {
    console.log(query)
  }
  render() {
    return (
      <>
        <div className={styles.header}>
          <Search onSearch={this.handleSearch} />
        </div>
        <div className={styles.footer}>
          <Results response={this.state.results} />
        </div>
      </>
    )
  }
}

export default App
