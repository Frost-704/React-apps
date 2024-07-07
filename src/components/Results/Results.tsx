import { Component } from 'react'
import styles from './Results.module.scss'
import { Man } from '../../api/api'

interface ResultsProps {
  response: Man[]
}

export default class Results extends Component<ResultsProps> {
  render() {
    const { response } = this.props
    return (
      <div className={styles['search-results']}>
        {response.map((person: Man, index: number) => (
          <div key={index}>
            <div>Name: {person.name}</div>
            <div>Height: {person.height}</div>
            <div>Mass: {person.mass}</div>
            <div>Hair Color: {person.hair_color}</div>
            <div>Birth Year: {person.birth_year}</div>
          </div>
        ))}
      </div>
    )
  }
}
