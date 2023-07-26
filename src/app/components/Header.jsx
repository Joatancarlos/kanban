"use client";
import React from 'react'
import styles from '../page.module.css'
import logoLight from '../../images/logo-light.svg'
import logoDark from '../../images/logo-dark.svg'
import Image from 'next/image'
import verticalEllipsis from '../../images/icon-vertical-ellipsis.svg'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
          <Image src={logoDark} alt="Kanban Logo" width={150} height={25} priority />
      </div>
        <div className={styles.header2}>
          <h1>Nome do Board</h1>
          <div className={styles.btns_header}>
            <button className={styles.btn}>
              + Add New Task
            </button>
            <button className={styles.btnElli}>
              <Image src={verticalEllipsis} alt="Vertical Ellipsis" />
            </button>
          </div>
        </div>
    </header>
  )
}
