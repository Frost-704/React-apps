import { ManResponse } from '../../api/api'

export type PaginationProps = Pick<
  ManResponse,
  'count' | 'next' | 'previous'
> & {
  onPageChange: (page: number) => void
}

export default function Pagination({
  previous,
  next,
  count,
  onPageChange,
}: PaginationProps) {
  const getPageNumber = (url: string | null): number | null => {
    if (!url) return null
    const urlObj = new URL(url)
    return parseInt(urlObj.searchParams.get('page') || '1')
  }
  const nextPageNumber = getPageNumber(next)
  const previousPageNumber = getPageNumber(previous)
  return (
    <div id="pagination">
      <button
        type="button"
        disabled={!previous}
        onClick={() => previousPageNumber && onPageChange(previousPageNumber)}
      >
        Prev
      </button>
      <span>{count} results</span>
      <button
        type="button"
        disabled={!next}
        onClick={() => nextPageNumber && onPageChange(nextPageNumber)}
      >
        Next
      </button>
    </div>
  )
}
