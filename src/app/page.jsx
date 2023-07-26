"use client";
import styles from './page.module.css'
import Header from './components/Header'
import Aside from './components/Aside'
import Main from './components/Main'
import useStore from '@/zustand/store';


export default function Home() {
  const [isHidden] = useStore((state) => 
  [state.isHidden]
  );
  return (
    <div className={styles.layout}>
      <Aside />
      <div className={isHidden ? styles.hiddenLayoutMain : styles.layoutMain}>
        <Header />
        <Main />
      </div>
    </div>
  )
}
