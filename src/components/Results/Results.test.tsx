import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Results from './Results'
import { ManResponse } from '../../api/api'
import { MemoryRouter } from 'react-router-dom'

const mockResults: ManResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
}

describe('Results component', () => {
  it('renders the results correctly', () => {
    render(
      <MemoryRouter>
        <Results {...mockResults} />
      </MemoryRouter>
    )

    const personName = screen.getByText(/Luke Skywalker/i)
    expect(personName).not.toBeNull()
  })

  it('displays message when no results are found', () => {
    const emptyResults: ManResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }

    render(
      <MemoryRouter>
        <Results {...emptyResults} />
      </MemoryRouter>
    )

    const noResultsMessage = screen.getByText(
      /0 Results, try another search query/i
    )
    expect(noResultsMessage).not.toBeNull()
  })
})
