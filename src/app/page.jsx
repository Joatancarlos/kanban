"use client";
import React, { useEffect } from 'react';
import styles from './page.module.css'
import Header from './components/Header'
import Aside from './components/Aside'
import Main from './components/Main'
import useStore from '@/zustand/store';
import { getSavedBoards, saveBoards } from '@/helpers/boardLocal';


export default function Home() {
  const [isHidden] = useStore((state) => 
  [state.isHidden]
  );
  // const initialBoard = 
  //   {
  //     "id": 1,
  //     "name": "My Board",
  //     "columns": []
  //   };
  // useEffect(() => {
  //   const boardLocal = getSavedBoards('board');
  //   const hasId1 = boardLocal.some((board) => board.id === 1);
  //   if (!hasId1) saveBoards('board', initialBoard);
  // }, []);
  return (
    <div className={styles.layout}>
      <Aside />
      <div className={isHidden ? styles.hiddenLayoutMain : styles.layoutMain}>
        <Header />
        <Main />
      </div>
    </div>
  )
}
