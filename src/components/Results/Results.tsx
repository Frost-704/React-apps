import styles from './Results.module.scss'
import { Man, ManResponse } from '../../api/api'
import { Link } from 'react-router-dom'

const Results = ({ results }: ManResponse) => {
  if (results.length === 0) {
    return (
      <div className={styles.error}>
        <span className={styles.errorText}>
          0 Results, try another search query
        </span>
      </div>
    )
  }
  return (
    <div className={styles['search-results']}>
      {results.map((person: Man) => {
        console.log('🚀 ~ {results.map ~ person:', person)
        const match = person.url.match(/\d+/)
        const id = match ? match[0] : 0
        return (
          <Link to={`/man/${id}`} className={styles.personLink}>
            <div key={id} className={styles.person}>
              <div className={styles.personImage}>
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                  alt={person.name}
                />
              </div>
              <div className={styles.personDesc}>
                <div>Name: {person.name}</div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Results
