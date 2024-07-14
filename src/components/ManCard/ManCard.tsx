import { useParams } from 'react-router-dom'
import styles from './ManCard.module.scss'
import API, { Endpoints, Man } from '../../api/api'
import { useEffect, useState } from 'react'

interface Name {
  name: string
  title?: string
}

export default function ManCard() {
  const { manId } = useParams<{ manId: string }>()
  const [person, setPerson] = useState<Man | null>(null)
  const [homeworld, setHomeworld] = useState<string>('')
  const [films, setFilms] = useState<string[]>([])
  const [species, setSpecies] = useState<string[]>([])
  const [vehicles, setVehicles] = useState<string[]>([])
  const [starships, setStarships] = useState<string[]>([])

  const fetchName = async (url: string): Promise<Name> => {
    const response = await fetch(url)
    return response.json()
  }
  useEffect(() => {
    const fetchPerson = async () => {
      if (manId) {
        try {
          const response = await API(Endpoints.people).getPerson(manId)
          setPerson(response)

          const homeworldResponse = await fetchName(response.homeworld)
          setHomeworld(homeworldResponse.name)

          const filmsResponse = await Promise.all(response.films.map(fetchName))
          setFilms(filmsResponse.map((film) => film.title!))

          const speciesResponse = await Promise.all(
            response.species.map(fetchName)
          )
          setSpecies(speciesResponse.map((specie) => specie.name))

          const vehiclesResponse = await Promise.all(
            response.vehicles.map(fetchName)
          )
          setVehicles(vehiclesResponse.map((vehicle) => vehicle.name))

          const starshipsResponse = await Promise.all(
            response.starships.map(fetchName)
          )
          setStarships(starshipsResponse.map((starship) => starship.name))
        } catch (error) {
          console.error('Failed to fetch person:', error)
        }
      }
    }
    fetchPerson()
  }, [manId])

  if (!person) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.person}>
      <div className={styles.personImage}>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${manId}.jpg`}
          alt={person.name}
        />
      </div>
      <div className={styles.personDesc}>
        <div>
          <span className={styles.title}>Name:</span> {person.name}
        </div>
        <div>
          <span className={styles.title}>Height:</span> {person.height}
        </div>
        <div>
          <span className={styles.title}>Mass:</span> {person.mass}
        </div>
        <div>
          <span className={styles.title}>Hair Color:</span> {person.hair_color}
        </div>
        <div>
          <span className={styles.title}>Skin Color:</span> {person.skin_color}
        </div>
        <div>
          <span className={styles.title}>Eye Color:</span> {person.eye_color}
        </div>
        <div>
          <span className={styles.title}>Birth Year:</span> {person.birth_year}
        </div>
        <div>
          <span className={styles.title}>Gender:</span> {person.gender}
        </div>
        <div>
          <span className={styles.title}>Homeworld:</span> {homeworld}
        </div>
        <div>
          <span className={styles.title}>Films:</span> {films.join(', ')}
        </div>
        <div>
          <span className={styles.title}>Species:</span> {species.join(', ')}
        </div>
        <div>
          <span className={styles.title}>Vehicles:</span> {vehicles.join(', ')}
        </div>
        <div>
          <span className={styles.title}>Starships:</span>{' '}
          {starships.join(', ')}
        </div>
      </div>
    </div>
  )
}
