const API_BASE_URL = 'https://swapi.dev/api/people/'

export interface Man {
  name: string
  height: string
  mass: string
  hair_color: string
  birth_year: string
}

interface BaseResponse {
  count: number
  next: null | string
  previous: null | string
  results: Man[]
}

export const getAllPeople = async (): Promise<Man[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: BaseResponse = await response.json()
    console.log(data)
    return data.results
  } catch (error) {
    console.error('getAllPeople API error:', error)
    throw error
  }
}
