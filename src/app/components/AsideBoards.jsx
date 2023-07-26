"use client";
import styles from '../page.module.css';
import Boards from './BoardFile';
import incoBoard from '../../images/icon-board.svg';
import Image from 'next/image';

const AsideBoards = () => {
  return (
  <>
    <div className={styles.asideBoards}>
      <Boards title="Platform Launch"/>
      <Boards title="Platform Launch"/>
      <Boards title="Platform Launch"/>
      <Boards title="Platform Launch"/>
      <Boards title="Platform Launch"/>
      <Boards title="Platform Launch"/>
      <Boards title="Platform Launch"/>
      <button>
        <Image src={incoBoard} alt="icon board" width={16} height={16} className={styles.iconBoard} />
        + Create New Board
      </button>
    </div>
  </>
  )
};

export default AsideBoards;