"use client";
import { useState } from 'react';
import incoBoard from '../../images/icon-board.svg';
import Image from 'next/image';
import styles from '../page.module.css';

const Boards = ({title}) => {
  const [isActive, setIsActive] = useState(false);


  const active = () => {
    setIsActive(!isActive);
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