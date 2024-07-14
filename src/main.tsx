import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage/ErrorPage'
import ManCard from './components/ManCard/ManCard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'man/:manId',
    element: <ManCard />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
)
