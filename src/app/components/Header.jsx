"use client";
import React, { useEffect, useRef, useState } from 'react'
import styles from '../page.module.css'
import Image from 'next/image'
import verticalEllipsis from '../../images/icon-vertical-ellipsis.svg'
import useStore from '@/zustand/store';
import EditDeleteBox from './EditDeleteBox';

export default function Header() {
  const [actualBoards] = useStore(state => [state.actualBoards]);
  // O objetivo da lógica das linhas 13 a 29 é fazer com que o componente EditDeleteBox apareça quando o usuário clicar no botão de três pontinhos e desapareça caso ele clique tanto fora do EditDeleteBox, quanto em algum do seus botões (editar board e deletar board).
  // PS. Peguei o código do chat GPT 
  const [isVisible, setIsVisible] = useState(false);
  const myElementRef = useRef(null);
  const handleClickOutside = (event) => {
    // console.log(myElementRef);
    // console.log(event.target);

    if (myElementRef.current && !myElementRef.current.contains(event.target)) {
      setIsVisible(false);
      console.log('entrei aqui');
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // console.log(actualBoards);

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
                handleClickDelete={() => console.log('Delete Board')}
              />  
            )}
          </div>
        </div>
    </header>
  )
}
