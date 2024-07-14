import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loader from './Loader'

vi.mock('./../../assets/img/Spinner.svg', () => ({
  default: 'loader.svg',
}))

vi.mock('./loader.module.scss', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    default: { loader: 'loader' },
  }
})

describe('Loader component', () => {
  it('renders the loader image', () => {
    render(<Loader />)
    const loaderImage = screen.getByAltText('Loading...')
    expect(loaderImage).toBeInTheDocument()
    expect(loaderImage).toHaveClass('loader')
  })
})
