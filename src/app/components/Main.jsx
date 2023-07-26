"use client";
import Image from 'next/image';
import useStore from '@/zustand/store';
import styles from '../page.module.css'
import hideSidebarEyeOpen from '../../images/icon-show-sidebar.svg';

export default function Main() {
  const [isHidden, updateHidden] = useStore((state) => [
    state.isHidden, state.updateHidden
  ]);

  return (
    <main className={isHidden ? styles.hiddenMain : styles.main}>
        <div className={styles.emptyBoard}>
          <p>This board is empty. Create a new column to get started.</p>
          <button className={styles.btn}>
            + add new column
          </button>
        </div>

        <div className={styles.sidebarContentHide}>

        <button
          type='button'
          onClick={() => updateHidden(!isHidden)}
          style={ isHidden ?  {display: 'block'} : {display: 'none'}}
        >
          <Image src={hideSidebarEyeOpen} alt="Hide Sidebar" width={20} height={20} priority />
        </button>

        </div>
    </main>
  )
}
