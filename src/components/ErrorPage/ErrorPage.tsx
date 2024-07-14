import { ErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse
  const errorText = `${error.status} ${error.statusText}`
  return (
    <div id="error-page">
      <h1>Error</h1>
      <p>Sorry, a {errorText} error has occurred.</p>
    </div>
  )
}
