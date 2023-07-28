"use client";
import React from 'react'
import styles from '../page.module.css'
import Image from 'next/image'
import verticalEllipsis from '../../images/icon-vertical-ellipsis.svg'
import useStore from '@/zustand/store';

export default function Header() {
  const [actualBoards] = useStore(state => [state.actualBoards]);
  return (
    <header className={styles.header}>
        <h1>{actualBoards.name}</h1>
        <div className={styles.btns_header}>
          <button className={styles.btn}>
            + Add New Task
          </button>
          <button>
            <Image src={verticalEllipsis} alt="Vertical Ellipsis" />
          </button>
        </div>
    </header>
  )
}
