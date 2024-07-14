import { useEffect, useState } from 'react'

const useSearchQuery = (): [string, (query: string) => void] => {
  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem('query')
    return savedQuery ?? ''
  })

  useEffect(() => {
    localStorage.setItem('query', query.trim().toLowerCase())
  }, [query])

  return [query, setQuery]
}

export default useSearchQuery
