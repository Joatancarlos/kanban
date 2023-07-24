import React from 'react'
import styles from '../page.module.css'
import Image from 'next/image'
import verticalEllipsis from '../../images/icon-vertical-ellipsis.svg'

export default function Header() {
  return (
    <header className={styles.header}>
        <span>Nome do Board</span>
        <div className={styles.btns_header}>
          <button>
            + Add New Task
          </button>
          <button>
            <Image src={verticalEllipsis} alt="Vertical Ellipsis" />
          </button>
        </div>
    </header>
  )
}
