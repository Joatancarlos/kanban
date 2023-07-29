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


function ModalNewBoard({ titleModal }) {
  // Hook que demonstra se a modal está aberta ou não
  const [modalNewBoard, updateModalNewBoard] = useStore((state) => 
  [state.modalNewBoard, state.updateModalNewBoard]
  );


  return (
    <div>
      <Modal
        isOpen={modalNewBoard}
        onRequestClose={modalNewBoard}
        contentLabel="Modal de exemplo"
        shouldCloseOnOverlayClick={true}
        style={customStyles}
      >
        <div className={styles.containerModal}>
          <div>
            <h2>{titleModal}</h2>
            <button 
              onClick={() => updateModalNewBoard(!modalNewBoard)}
              type="button"
            >
              Fechar
            </button>
          </div>
          <form className={styles.formAdd}>
            <label>Title</label>
            <div>
              <input type="text" placeholder="e.g. Take coffee break" />
            </div>
            <label htmlFor="desc">Description</label>
            <div>
              <textarea name="description" id="desc" />
            </div>
              <label>Subtaks</label>
            <div>
              <div>
                <input type="text" placeholder="e.g. Make coffee" />
                <button onClick={(e) => e.preventDefault()}>
                  <Image src={closeIcon} alt="close" width={15} height={15}/>
                </button>
              </div>
            </div>
            <button>
              + add new subtask
            </button>
            <label htmlFor="">Status</label>
            <div>
              <select name="" id="">
                <option value="">To do</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => updateModalNewBoard(!modalNewBoard)}
            >
              create task
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalNewBoard;