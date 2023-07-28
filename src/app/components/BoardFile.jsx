"use client";
import { useEffect, useState } from 'react';
import { getSavedBoards } from '@/helpers/boardLocal';
import incoBoard from '../../images/icon-board.svg';
import Image from 'next/image';
import styles from '../page.module.css';
import useStore from '@/zustand/store';


const Boards = ({title}) => {
  const [modalNewBoard, updateActualBoards, updateActualBoardId] = useStore((state) => 
  [state.modalNewBoard, state.updateActualBoards , state.updateActualBoardId]
  );
  const [isActive, setIsActive] = useState(false);
  // const [actualId, setActualId] = useState(0);
  const [boardLocal, setBoardLocal] = useState([]);
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

  const active = () => {
    setIsActive(!isActive);
    const actualObj = boardLocal.find((obj) => obj.name === title);
    updateActualBoards(actualObj);
    updateActualBoardId(actualObj.id);
  };

  return (
    <div onClick={ active } className={isActive ? styles.boardsActive : styles.boardBtn}>
      <h4>
        <Image src={incoBoard} alt="icon board" width={16} height={16} className={styles.iconBoard} />
        {title}
      </h4>
    </div>
  );
};

export default Boards;