import { Outlet, useParams } from 'react-router-dom'
import ManCard from '../ManCard/ManCard'
import styles from './Layout.module.scss'

const Layout = () => {
  const { manId } = useParams<{ manId: string }>()
  return (
    <div className={styles.layout}>
      <main className={manId ? styles.contentWithCard : styles.contentFull}>
        <Outlet />
      </main>
      <div className={manId ? styles.sidebar : styles.hidden}>
        {manId ? <ManCard /> : <div>Select a person to see details</div>}
      </div>
    </div>
  )
}

export default Layout
