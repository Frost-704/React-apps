import { ManResponse } from '../../api/api'

export type Pagination = Pick<ManResponse, 'count' | 'next' | 'previous'>

export default function Pagination({ previous, next, count }: Pagination) {
  return (
    <div id="pagination">
      <button type="button" disabled={!previous}>
        Prev
      </button>
      <span>{count} results</span>
      <button type="button" disabled={!next}>
        Next
      </button>
    </div>
  )
}
