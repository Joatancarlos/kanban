"use client";
import { useEffect, useState } from 'react';
import { getSavedBoards } from '@/helpers/boardLocal';
import Image from 'next/image';
import useStore from '@/zustand/store';
import styles from '../page.module.css'
import hideSidebarEyeOpen from '../../images/icon-show-sidebar.svg';
import ModalNewBoard from './modals/ModalNewBoard';
import Columns from './columns/Columns';
import ModalEditBoard from './modals/ModalEditBoard';

export default function Main() {
  const [isHidden, updateHidden, modalNewBoard, actualBoards, 
    modalEditBoard] = useStore((state) => [
    state.isHidden, 
    state.updateHidden, 
    state.modalNewBoard,
    state.actualBoards,
    state.modalEditBoard,
  ]);
  const [boardLocal, setBoardLocal] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setBoardLocal(boards)
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } else {
      setBoardLocal([])
    }
  }, [modalNewBoard]);

  useEffect(() => {
    if (boardLocal.length !== 0) {
      const board = boardLocal.find((board) => board.id === actualBoards.id);
      const columns = board ? board.columns : [];
      setColumns(columns);
    }
  }, [actualBoards]);

  console.log(actualBoards);
  
  return (
    <main className={isHidden ? styles.hiddenMain : styles.main}>
        {columns.length !== 0 ? (
          <Columns columns={columns} />
        ) : (
          <div className={styles.emptyBoard}>
          <p>This board is empty. Create a new column to get started.</p>
          <button className={styles.btn}>
            + add new column
          </button>
        </div>
        )} 
        

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
        {modalEditBoard && (
          <ModalEditBoard  
            actualBoard={actualBoards}
            boardLocal={boardLocal}
          />
        )}
    </main>
  )
}
