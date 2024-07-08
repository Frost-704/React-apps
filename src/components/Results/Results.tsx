import { Component } from 'react'
import styles from './Results.module.scss'
import { Man } from '../../api/api'

interface ResultsProps {
  response: Man[]
}

export default class Results extends Component<ResultsProps> {
  render() {
    const { response } = this.props

    if (response.length === 0) {
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
        {response.map((person: Man) => {
          const match = person.url.match(/\d+/)
          const id = match ? match[0] : 0
          return (
            <div key={id} className={styles.person}>
              <div className={styles.personImage}>
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                  alt={person.name}
                />
              </div>
              <div className={styles.personDesc}>
                <div>Name: {person.name}</div>
                <div>Height: {person.height}</div>
                <div>Mass: {person.mass}</div>
                <div>Hair Color: {person.hair_color}</div>
                <div>Birth Year: {person.birth_year}</div>
                <div>Url: {person.url}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
