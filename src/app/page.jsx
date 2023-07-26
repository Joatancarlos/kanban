import styles from './page.module.css'
import Header from './components/Header'
import Aside from './components/Aside'
import Main from './components/Main'

import { storeWrapper } from "../redux/store";

export default function Home() {
  return (
      <div className={styles.layout}>
          <Header />
        <div className={styles.layoutMain}>
          <Aside />
          <Main />
        </div>
      </div>
  )
}

// export const test = storeWrapper.withRedux(Home);