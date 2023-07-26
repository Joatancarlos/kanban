"use client";
import styles from '../page.module.css'
import Image from 'next/image'
import logoLight from '../../images/logo-light.svg'
import logoDark from '../../images/logo-dark.svg'
import AsideBoards from './AsideBoards'
import DarkMode from './DarkMode'
import HideSidebar from './HideSidebar'
import useStore from '@/zustand/store';


export default function Aside() {
  const [isHidden, updateHidden] = useStore((state) => 
  [state.isHidden, state.updateHidden]
  );
  return (
    <aside className={isHidden ? styles.hiddenAsideContainer : ''}>
      
      <div className={isHidden ? styles.hiddenLogo : styles.logo}>
          <Image src={logoDark} alt="Kanban Logo" width={150} height={25} priority />
      </div>
      <div className={isHidden ? styles.hiddenAsideContent : styles.asideContent}> 
        <div>
          <div>
            <h4 className={styles.asideTitle}>ALL BOARDS (3)</h4>
          </div>
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
