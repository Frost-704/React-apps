import loader from './../../assets/img/Spinner.svg'
import styles from './loader.module.scss'
const Loader = () => {
  return <img className={styles.loader} src={loader} alt="Loading..." />
}

export default Loader
