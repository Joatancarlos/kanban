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
  const [isHidden,
      updateHidden, 
      modalNewBoard, 
      actualBoards, 
      modalEditBoard,
      isNewTask,
  ] = useStore((state) => [
    state.isHidden, 
    state.updateHidden, 
    state.modalNewBoard,
    state.actualBoards,
    state.modalEditBoard,
    state.isNewTask,
  ]);

  const [boardLocal, setBoardLocal] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        console.log(boards, 'boards');
        // valores atualizados
        setBoardLocal(boards)
        const board = boards.find((board) => board.id === actualBoards.id);
        const columns = board ? board.columns : [];
        setColumns(columns);
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } else {
      setBoardLocal([])
    }
  }, [modalNewBoard, actualBoards]);

  const newBoardOrColumn = () => {
  }
     
        

  // useEffect(() => {
  //   if (boardLocal.length !== 0) {
  //     const board = boardLocal.find((board) => board.id === actualBoards.id);
  //     console.log(board, 'board');
  //     const columns = board ? board.columns : [];
  //     // valores nao atualizados
  //     console.log(columns, 'columns');
  //     setColumns(columns);
  //   }
  // }, [actualBoards, isNewTask]);
  
  // console.log(actualBoards, 'actualBoards');
  // console.log(boardLocal[0].columns, 'boardLocal linha 58');
  // até aqui o boardLocal está vindo com as colunas atualizadas
  return (
    <main className={isHidden ? styles.hiddenMain : styles.main}>
      {/* {console.log(columns, 'columns')} */}
        {columns.length !== 0 ? (
          <Columns columns={columns} />
        ) : (
          <div className={`${styles.main} ${styles.mainEmptyBoard}`}>
            <div className={styles.emptyBoard}>
              <p>This board is empty. Create a new column to get started.</p>
              <button className={` ${styles.btn} ${styles.btnPrimaryLight}`}>
                + add new column
              </button>
            </div> 
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
        <ModalEditBoard  
          actualBoard={actualBoards}
          boardLocal={boardLocal}
        />
    </main>
  )
}
