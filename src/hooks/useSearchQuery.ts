import { useEffect, useState } from 'react'

const useSearchQuery = (): [
  string,
  (query: string) => void,
  number,
  (page: number) => void,
] => {
  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem('query')
    return savedQuery ?? ''
  })

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('page')
    return savedPage ? parseInt(savedPage, 10) : 1
  })

  useEffect(() => {
    localStorage.setItem('query', query.trim().toLowerCase())
  }, [query])

  useEffect(() => {
    localStorage.setItem('page', page.toString())
  }, [page])

  return [query, setQuery, page, setPage]
}

export default useSearchQuery
