/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from 'react';
// Importa a modal do react-modal
import Modal from 'react-modal';
import Image from 'next/image';
import closeIcon from '../../../images/icon-cross.svg'
import useStore from '@/zustand/store';
import styles from '../../page.module.css';

const customStyles = {
  content: {
    minWidth: '38vw', 
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function ModalNewBoard({ titleModal, handleClick }) {
  // Hook que demonstra se a modal está aberta ou não
  const [modalNewBoard, updateModalNewBoard] = useStore((state) => 
  [state.modalNewBoard, state.updateModalNewBoard]
  );

  function fecharModal() {
    updateModalNewBoard(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalNewBoard}
        onRequestClose={fecharModal}
        contentLabel="Modal de exemplo"
        shouldCloseOnOverlayClick={true}
        style={customStyles}
      >
        <div className={styles.containerModal}>
          <div>
            <h2>{titleModal}</h2>
          </div>
          <form className={styles.formAdd}>
            <label>Name</label>
            <div>
              <input className={styles.input} type="text" placeholder="e.g. Web Design" />
            </div>
            <label>Columns</label>
            <div>
              <div className={styles.inputWithClose}>
                <input className={styles.input} type="text" value="Todo" />
                <button onClick={(e) => e.preventDefault()}>
                  <Image src={closeIcon} alt="close" width={15} height={15}/>
                </button>
              </div>
            </div>
            <button className={styles.btn}>
              + add new column
            </button>
            <button
              type="button"
              onClick={() => updateModalNewBoard(!modalNewBoard)}
              className={styles.btn}
            >
              create new board
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalNewBoard;