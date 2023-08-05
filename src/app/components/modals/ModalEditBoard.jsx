"use client";
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import useStore from '@/zustand/store';
import styles from '../../page.module.css';
import InputColumn from './InputColumn';
import { v4 as uuidv4 } from 'uuid';
import { customStyles } from './customStyles';

export default function ModalEditBoard({actualBoard, boardLocal}) {
  const [modalEditBoard, updateModalEditBoard, isDelete, updateIsDelete, isDarkMode] = useStore((state) =>
    [state.modalEditBoard, state.updateModalEditBoard, state.isDelete, state.updateIsDelete, state.isDarkMode]
  );
  const objInitial = {name: ''};
  const [columns, setColumns] = useState([objInitial]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [boardName, setBoardName] = useState('');
  
  useEffect(() => {
    setBoardName(actualBoard.name);
    setColumns(actualBoard.columns);
  }, [actualBoard]);

  // console.log(columns, 'columns');
  // const customStyles = {
  //   content: {
  //     minWidth: '38vw', 
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //     backgroundColor: isDarkMode ? "#2B2C37" : "#fff",
  //   },
  // };

  const custom = customStyles(isDarkMode);

  function fecharModal() {
    updateModalEditBoard(false);
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
    columns.map((column) => {
      if (column.id === undefined) {
        column.id = uuidv4();
      }
    });
    if (boardName.length > 1) {
      setIsDisabled(false);
      const columnsNotEmpty = columns.filter((col) => col.name !== "");

      const editBoard = {
        id: actualBoard.id,
        name: boardName, 
        columns: [
          ...columnsNotEmpty
        ],
      }
      const index = boardLocal.findIndex((board) => board.id === actualBoard.id);
      boardLocal[index] = editBoard;
      localStorage.removeItem('board');
      localStorage.setItem('board', JSON.stringify(boardLocal));
      // Alterar o estado do isDelete aqui serve somente para atualizar o componente BoardFile
      updateIsDelete(!isDelete);
      fecharModal();
    } else {
      setIsDisabled(true);
    }
    
  };

  return (
    <div>
      <Modal
        isOpen={modalEditBoard}
        onRequestClose={fecharModal}
        contentLabel="Modal de exemplo"
        shouldCloseOnOverlayClick={true}
        style={custom}
        ariaHideApp={false}
      >
        <div className={isDarkMode ? `${styles.containerModal} ${styles.containerModalDarkMode}` : styles.containerModal}>
          <div>
            <h3>Edit Board</h3>
          </div>
          <form className={styles.formAdd}>
            <label className={styles.label}>Board Name</label>
            <div>
              <input 
                className={isDarkMode ? styles.inputDark : styles.input} 
                type="text" 
                placeholder="e.g. Web Design"
                value={boardName}
                onChange={(e) => handleChange(e, setBoardName)}
                autoFocus
              />
            </div>
            { isDisabled && <p className={styles.error}>Please enter a name</p>}
            {actualBoard.length !== 0 && (
              <label className={styles.label}>Board Columns</label>
            )}
          
            {columns && columns.map((_inputValue, index) => (
              <InputColumn 
                key={index}
                index={index}
                inputValue={columns[index].name}
                handleInputChange={handleInputChange}
                handleRemoveInput={handleRemoveInput}
                isDarkMode={isDarkMode}
              />
            ))}
            
            <button 
              className={isDarkMode ? ` ${styles.btn} ${styles.btnSecondaryLight} ${styles.btnDarkMode}` : ` ${styles.btn} ${styles.btnSecondaryLight}`} 
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
              save changes
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
