"use client";
import styles from '../page.module.css'
import Image from 'next/image'
import logoLight from '../../images/logo-light.svg'
import logoDark from '../../images/logo-dark.svg'
import AsideBoards from './AsideBoards'
import DarkMode from './DarkMode'
import HideSidebar from './HideSidebar'

export default function Aside() {
  return (
    <aside className={styles.asideContainer}>
      <div className={styles.asideContent}  > 
      <div>
        <h4 className={styles.asideTitle}>ALL BOARDS (3)</h4>
        <AsideBoards />
      </div>
      <div>
        <DarkMode />
        <HideSidebar />
      </div>
      </div>
    </aside>
  )
}
