import styles from './page.module.css'
import Header from './components/Header'
import Aside from './components/Aside'
import Main from './components/Main'

export default function Home() {
  return (
    <div className={styles.layout}>
      <Aside />
      <div className={styles.layoutMain}>
        <Header />
        <Main />
      </div>
    </div>
  )
}
