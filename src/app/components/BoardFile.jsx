"use client";
import { useState } from 'react';
import styles from '../page.module.css';

const Boards = ({title}) => {
  const [isActive, setIsActive] = useState(false);


  const active = () => {
    setIsActive(!isActive);
  };

  return (
    <div onClick={ active }>
      <h4 
        className={isActive ? styles.boardsActive : styles.boardsInactive}
      >
        {title}
      </h4>
    </div>
  );
};

export default Boards;