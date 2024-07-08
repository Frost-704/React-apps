import { Component } from 'react'

const API_BASE_URL = 'https://swapi.dev/api/people/'

export interface Man {
  name: string
  height: string
  mass: string
  hair_color: string
  birth_year: string
  url: string
}

interface BaseResponse {
  count: number
  next: null | string
  previous: null | string
  results: Man[]
}

class API extends Component {
  private baseUrl: string

  constructor(baseUrl: string) {
    super(baseUrl)
    this.baseUrl = baseUrl
  }

  async searchPeople(query?: string): Promise<Man[]> {
    try {
      const response = await fetch(`${this.baseUrl}/?search=${query}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: BaseResponse = await response.json()
      return data.results
    } catch (error) {
      console.error('searchPeople API error:', error)
      throw error
    }
  }
}

export default new API(API_BASE_URL)
