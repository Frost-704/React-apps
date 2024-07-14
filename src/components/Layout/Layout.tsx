import { Outlet, useParams } from 'react-router-dom'
import ManCard from '../ManCard/ManCard'
import styles from './Layout.module.scss'
import { useEffect, useState } from 'react'

const Layout = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(true)
  const { manId } = useParams()

  useEffect(() => {
    if (manId) {
      setIsSidebarClosed(false)
    } else {
      setIsSidebarClosed(true)
    }
  }, [manId])

  const closeManCard = () => {
    setIsSidebarClosed(true)
  }

  const handleMainClick = () => {
    if (!isSidebarClosed) {
      closeManCard()
    }
  }

  return (
    <div className={styles.layout}>
      <main
        className={
          isSidebarClosed ? styles.contentFull : styles.contentWithCard
        }
        onClick={handleMainClick}
      >
        <Outlet />
      </main>
      <div
        className={manId && !isSidebarClosed ? styles.sidebar : styles.hidden}
      >
        {manId && <button onClick={closeManCard}>Close</button>}
        {manId ? <ManCard /> : <div>Select a person to see details</div>}
      </div>
    </div>
  )
}

export default Layout
