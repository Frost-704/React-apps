export interface Man {
  name: string
  height: string
  mass: string
  hair_color: string
  birth_year: string
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

const API = (endpoint: Endpoints) => {
  const url = `https://swapi.dev/api/${endpoint}`
  const searchPeople = async (query?: string): Promise<ManResponse> => {
    try {
      const response = await fetch(`${url}/?search=${query}`)
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

  return { searchPeople }
}

export default API
