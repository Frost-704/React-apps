/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import styles from './App.module.scss'
import Search from '../Search/Search'
import SearchResults from '../SearchResults/SearchResults'

function App() {
  return (
    <>
      <div className={styles.header}>
        <Search query="aasdasd" />
      </div>
      <div className={styles.footer}>
        <SearchResults />
      </div>
    </>
  )
}

export default App
