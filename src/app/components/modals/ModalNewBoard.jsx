/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
// Importa a modal do react-modal
import Modal from 'react-modal';
import Image from 'next/image';
import closeIcon from '../../../images/icon-cross.svg'
import useStore from '@/zustand/store';
import styles from '../../page.module.css';
import InputColumn from './InputColumn';
import { getSavedBoards, saveBoards } from '@/helpers/boardLocal';

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
  const [modalNewBoard, updateModalNewBoard] = useStore((state) => 
  [state.modalNewBoard, state.updateModalNewBoard]
  );
  const objInitial = {name: ''};
  const [columns, setColumns] = useState([objInitial]);
  const [boardName, setBoardName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [id, setId] = useState(1);
  

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setId(boards.length + 1);
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    }
    // handleCheckInput();
  }, []);

  function fecharModal() {
    updateModalNewBoard(false);
  }

  const handleAddInput = (e) => {
    setColumns([...columns, { name: e.target.value }]);
  };
  
  const handleCheckInput = (value) => {
    if (value.length > 1 && value !== undefined) {
      setIsDisabled(false);
    } 
  };
  
  const handleInputChange = (index, value) => {
    const newInputs = [...columns];
    const obj = newInputs.find((_col, i) => i === index)
    obj.name = value;
    setColumns(newInputs);
  };
  
  const handleRemoveInput = (index) => {
    const newInputs = [...columns];
    const newInput = newInputs.filter((_col, i) => i !== index)
    // newInputs.splice(index, 1);
    setColumns(newInput);
  };
  
  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
    handleCheckInput(value);
  };



  const saveBoard = () => {
    if (boardName.length > 1) {
      setIsDisabled(false);
      const columnsNotEmpty = columns.filter((col) => col.name !== "");
      saveBoards("board", {
        id,
        name: boardName, 
        columns: columnsNotEmpty,
      });
      fecharModal();
    } else {
      setIsDisabled(true);
    }
    
  };

  return (
    <div>
      <Modal
        isOpen={modalNewBoard}
        onRequestClose={fecharModal}
        contentLabel="Modal de exemplo"
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className={styles.containerModal}>
          <div>
            <h3>{titleModal}</h3>
          </div>
          <form className={styles.formAdd}>
            <label>Name</label>
            <div>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="e.g. Web Design" 
                value={boardName}
                onChange={(e) => handleChange(e, setBoardName)}
                autoFocus
              />
            </div>
            { isDisabled && <p className={styles.error}>Please enter a name</p>}
            {columns.length !== 0 && (
              <label>Columns</label>
            )}
          
            {columns && columns.map((inputValue, index) => (
              <InputColumn 
                key={index}
                index={index}
                inputValue={inputValue.name}
                handleInputChange={handleInputChange}
                handleRemoveInput={handleRemoveInput}
              />
            ))}
            
            <button 
              className={` ${styles.btn} ${styles.btnSecondaryLight}`} 
              onClick={handleAddInput}
              type='button'
            >
              + add new column
            </button>
            
            <button
              type="button"
              onClick={saveBoard}
              className={` ${styles.btn} ${styles.btnPrimaryLight}`}
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