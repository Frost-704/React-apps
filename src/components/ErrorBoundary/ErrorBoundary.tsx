import { Component, ErrorInfo, ReactNode } from 'react'
import errorImg from '../../assets/img/Error_icon.svg'
import styles from './ErrorBoundary.module.scss'

interface State {
  hasError: boolean
}

interface Props {
  children: ReactNode
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <img src={errorImg} alt="Error" />
          <h1 className={styles.errorText}>Something went wrong</h1>
        </div>
      )
    }

    return this.props.children
  }
}
