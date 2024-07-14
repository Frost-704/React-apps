import { useParams } from 'react-router-dom'
import styles from './ManCard.module.scss'
import API, { Endpoints, Man } from '../../api/api'
import { useEffect, useState } from 'react'

export default function ManCard() {
  const { manId } = useParams<{ manId: string }>()
  const [person, setPerson] = useState<Man | null>(null)
  const [homeworld, setHomeworld] = useState<string>('')
  const [films, setFilms] = useState<string[]>([])
  const [species, setSpecies] = useState<string[]>([])
  const [vehicles, setVehicles] = useState<string[]>([])
  const [starships, setStarships] = useState<string[]>([])

  useEffect(() => {
    const fetchPerson = async () => {
      if (manId) {
        try {
          const response = await API(Endpoints.people).getPerson(manId)
          setPerson(response)

          const homeworldResponse = await API(Endpoints.planets).fetchName(
            response.homeworld
          )
          setHomeworld(homeworldResponse.name)

          const filmsResponse = await Promise.all(
            response.films.map(API(Endpoints.films).fetchName)
          )
          setFilms(filmsResponse.map((film) => film.title!))

          const speciesResponse = await Promise.all(
            response.species.map(API(Endpoints.species).fetchName)
          )
          setSpecies(speciesResponse.map((specie) => specie.name))

          const vehiclesResponse = await Promise.all(
            response.vehicles.map(API(Endpoints.vehicles).fetchName)
          )
          setVehicles(vehiclesResponse.map((vehicle) => vehicle.name))

          const starshipsResponse = await Promise.all(
            response.starships.map(API(Endpoints.spaceships).fetchName)
          )
          setStarships(starshipsResponse.map((starship) => starship.name))
        } catch (error) {
          console.error('Failed to fetch person:', error)
          throw new Error("Can't find person")
        }
      }
    }
    fetchPerson()
  }, [manId])

  if (!person) {
    return <div>Error: Can't find person</div>
  }
  return (
    <div className={styles.person}>
      <div className={styles.personImage}>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${manId}.jpg`}
          alt={person?.name}
        />
      </div>
      <div className={styles.personDesc}>
        {person.name && (
          <div>
            <span className={styles.title}>Name:</span> {person.name}
          </div>
        )}
        {person.height && (
          <div>
            <span className={styles.title}>Height:</span> {person.height}
          </div>
        )}
        {person.mass && (
          <div>
            <span className={styles.title}>Mass:</span> {person.mass}
          </div>
        )}
        {person.hair_color && (
          <div>
            <span className={styles.title}>Hair Color:</span>{' '}
            {person.hair_color}
          </div>
        )}
        {person.skin_color && (
          <div>
            <span className={styles.title}>Skin Color:</span>{' '}
            {person.skin_color}
          </div>
        )}
        {person.eye_color && (
          <div>
            <span className={styles.title}>Eye Color:</span> {person.eye_color}
          </div>
        )}
        {person.birth_year && (
          <div>
            <span className={styles.title}>Birth Year:</span>{' '}
            {person.birth_year}
          </div>
        )}
        {person.gender && (
          <div>
            <span className={styles.title}>Gender:</span> {person.gender}
          </div>
        )}
        {homeworld && (
          <div>
            <span className={styles.title}>Homeworld:</span> {homeworld}
          </div>
        )}
        {films.length > 0 && (
          <div>
            <span className={styles.title}>Films:</span> {films.join(', ')}
          </div>
        )}
        {species.length > 0 && (
          <div>
            <span className={styles.title}>Species:</span> {species.join(', ')}
          </div>
        )}
        {vehicles.length > 0 && (
          <div>
            <span className={styles.title}>Vehicles:</span>{' '}
            {vehicles.join(', ')}
          </div>
        )}
        {starships.length > 0 && (
          <div>
            <span className={styles.title}>Starships:</span>{' '}
            {starships.join(', ')}
          </div>
        )}
      </div>
    </div>
  )
}
