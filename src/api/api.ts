export interface Man {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export interface ManResponse {
  count: number
  next: null | string
  previous: null | string
  results: Man[]
}

export enum Endpoints {
  planets = 'planets',
  spaceships = 'spaceships',
  vehicles = 'vehicles',
  people = 'people',
  films = 'films',
  species = 'species',
}
interface Name {
  name: string
  title?: string
}

const API = (endpoint: Endpoints) => {
  const url = `https://swapi.dev/api/${endpoint}`
  const searchPeople = async (
    query?: string,
    page: number = 1
  ): Promise<ManResponse> => {
    try {
      const response = await fetch(`${url}/?search=${query}&page=${page}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: ManResponse = await response.json()
      return data
    } catch (error) {
      console.error('searchPeople API error:', error)
      throw error
    }
  }

  const getPerson = async (id: string) => {
    try {
      const response = await fetch(`${url}/${id}`)
      if (!response.ok) {
        throw new Error(`getData error! status: ${response.status}`)
      }
      const data: Man = await response.json()
      return data
    } catch (error) {
      console.error('getPerson API error:', error)
      throw error
    }
  }

  const fetchName = async (url: string): Promise<Name> => {
    const response = await fetch(url)
    return response.json()
  }
  return { searchPeople, getPerson, fetchName }
}

export default API
