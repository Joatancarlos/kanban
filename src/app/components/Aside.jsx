import styles from '../page.module.css'
import Image from 'next/image'
import logoLight from '../../images/logo-light.svg'
import logoDark from '../../images/logo-dark.svg'

export default function Aside() {
  return (
    <aside>
        <div className={styles.logo}>
          <Image src={logoDark} alt="Kanban Logo" width={200} height={50} priority />
        </div>
    </aside>
  )
}
