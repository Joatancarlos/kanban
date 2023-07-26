"use client";
import Image from 'next/image';
import useStore from '@/zustand/store';
import styles from '../page.module.css'
import hideSidebarEyeOpen from '../../images/icon-show-sidebar.svg';
import ModalNewBoard from './modals/ModalNewBoard';

export default function Main() {
  const [isHidden, updateHidden, modalNewBoard] = useStore((state) => [
    state.isHidden, state.updateHidden, state.modalNewBoard,
  ]);

  console.log(modalNewBoard);

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
          className={ isHidden ?  styles.showBtn : styles.hideBtn}
        >
          <Image src={hideSidebarEyeOpen} alt="Hide Sidebar" width={20} height={15} priority />
        </button>
        </div>
        {modalNewBoard && (
          <ModalNewBoard 
            titleModal="Add New Board"
          />
        )}
    </main>
  )
}
