"use client";
import React, { useEffect, useState } from 'react';
import styles from '../page.module.css'
import Image from 'next/image'
import logoLight from '../../images/logo-light.svg'
import logoDark from '../../images/logo-dark.svg'
import AsideBoards from './AsideBoards'
import DarkMode from './DarkMode'
import HideSidebar from './HideSidebar'
import useStore from '@/zustand/store';
import { getSavedBoards, saveBoards } from '@/helpers/boardLocal';


export default function Aside() {
  const [isHidden, modalNewBoard] = useStore((state) => 
  [state.isHidden, state.modalNewBoard]
  );
  const [boards, setBoards] = useState([])
  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setBoards(boards)
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    }
  }, [modalNewBoard]);

  return (
    <aside className={isHidden ? styles.hiddenAsideContainer : styles.asideContainer}>
      
      <div className={isHidden ? styles.hiddenLogo : styles.logo}>
          <Image src={logoDark} alt="Kanban Logo" width={150} height={25} priority />
      </div>
      <div className={isHidden ? styles.hiddenAsideContent : styles.asideContent}> 
        <div>
          <div>
            <h4 className={styles.asideTitle}>ALL BOARDS ({boards.length})</h4>
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
