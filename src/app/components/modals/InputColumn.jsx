import React from 'react'
import Image from 'next/image';
import closeIcon from '../../../images/icon-cross.svg'
import styles from '../../page.module.css';


export default function InputColumn({ index, handleInputChange, handleRemoveInput}) {
  return (
    <div className={styles.inputWithClose}>
      <input
        type="text"
        className={styles.input}
        placeholder="e.g. Todo"
        onChange={(e) => handleInputChange(index, e.target.value)}
      />
      <button 
        onClick={() => handleRemoveInput(index)}
        type='button'
      >
        <Image src={closeIcon} alt="close" width={15} height={15}/>
      </button>
    </div>
  )
}
