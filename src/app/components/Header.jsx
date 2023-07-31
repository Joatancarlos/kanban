"use client";
import React, { useEffect, useRef, useState } from 'react'
import { getSavedBoards, saveBoards } from '@/helpers/boardLocal';
import styles from '../page.module.css'
import Image from 'next/image'
import verticalEllipsis from '../../images/icon-vertical-ellipsis.svg'
import useStore from '@/zustand/store';
import EditDeleteBox from './modals/EditDeleteBox';
import ModalDelete from './modals/ModalDelete';

export default function Header() {
  const [actualBoards,
      modalNewBoard,
      modalDeleteBoard,
      idDelete, 
      updateModalDeleteBoard,
      updateIsDelete,
    ] = useStore(state => (
    [state.actualBoards,
      state.modalNewBoard,
      state.modalDeleteBoard,
      state.isDelete,
      state.updateModalDeleteBoard,
      state.updateIsDelete,
    ]
  ));

  const [isVisible, setIsVisible] = useState(false);
  const [boardLocal, setBoardLocal] = useState([]);

  const myElementRef = useRef(null);
  const handleClickOutside = (event) => {
    // console.log(myElementRef);
    // console.log(event.target);

    if (myElementRef.current && !myElementRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setBoardLocal(boards)
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    }
  }, [modalNewBoard]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const showDeleteBox = () => {
    updateModalDeleteBoard(!modalDeleteBoard);
  }
  
  const deleteBoard = () => {
    const newBoards = boardLocal.filter((board) => board.id !== actualBoards.id);
    localStorage.removeItem('board');
    localStorage.setItem('board', JSON.stringify(newBoards));
    updateIsDelete(!idDelete);
    showDeleteBox();
  }


  return (
    <header className={styles.header}>
        <h1>{actualBoards.name}</h1>
        <div className={styles.btns_header}>
          <button className={styles.btn}>
            + Add New Task
          </button>
          <div>
            <button
              onClick={(event) => {
                setIsVisible(!isVisible)
                event.stopPropagation()
              }}
              style={{ padding: '5px' }}
              ref={myElementRef}
            >
              <Image src={verticalEllipsis} alt="Vertical Ellipsis" />
            </button>
            {isVisible && (
              <EditDeleteBox
                whosEdit="Board"
                whosDelete="Board"
                handleClickEdit={() => console.log('Edit Board')}
                handleClickDelete={showDeleteBox}
              />  
            )}

            {modalDeleteBoard && (
              <ModalDelete 
                modalDeleteBoard={modalDeleteBoard} 
                showDeleteBox={showDeleteBox}
                deleteFunction={deleteBoard}
                nameBoard={actualBoards.name}
              />
            )}
          </div>
        </div>
    </header>
  )
}
