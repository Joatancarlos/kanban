import styles from '../page.module.css'
import Image from 'next/image'
import logoLight from '../../images/logo-light.svg'
import logoDark from '../../images/logo-dark.svg'
import AsideBoards from './AsideBoards'

export default function Aside() {
  return (
    <aside className={styles.asideContainer}>
        <div className={styles.logo}>
          <Image src={logoDark} alt="Kanban Logo" width={200} height={50} priority />
        </div>
        <div className={styles.asideContent}> 
          <div>
            <h3 className={styles.asideTitle}>ALL BOARDS (3)</h3>
          </div>
        <AsideBoards />
      </div>
    </aside>
  )
}
