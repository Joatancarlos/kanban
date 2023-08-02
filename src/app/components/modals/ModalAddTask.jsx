/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
// Importa o modal do react-modal
import Modal from 'react-modal';
import useStore from '@/zustand/store';
import InputColumn from './InputColumn';
import styles from '../../page.module.css';
import chevron from '@/images/icon-chevron-down.svg';


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


function ModalAddTask({ titleModal, boardLocal }) {
  // Hook que demonstra se a modal está aberta ou não
  const [isNewTask, 
        actualBoards, 
        updateIsNewTask, 
        updateActualBoards
      ] = useStore((state) => 
        [ state.isNewTask, 
          state.actualBoards,
          state.updateIsNewTask, 
          state.updateActualBoards]
        );

  const [taskTitle, setTaskTitle] = useState('');
  const [tasksDescription, setTasksdescription] = useState('');
  const [tasksStatus, setTasksStatus] = useState(actualBoards.columns[0].name);
  const [subTasks, setSubTasks] = useState([{ name: '' }]);

  const handleAddInput = (e) => {
    setSubTasks([...subTasks, { name: e.target.value }]);
  };
  
  const handleCheckInput = (value) => {
    if (value.length > 1 && value !== undefined) {
    } 
  };
  
  const handleInputChange = (index, value) => {
    const newInputs = [...subTasks];
    const obj = newInputs.find((_col, i) => i === index)
    obj.name = value;
    setSubTasks(newInputs);
  };
  
  const handleRemoveInput = (index) => {
    const newInputs = [...columns];
    const newInput = newInputs.filter((_col, i) => i !== index)
    // newInputs.splice(index, 1);
    setSubTasks(newInput);
  };
  
  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
    handleCheckInput(value);
  };

    const saveTask = () => {
      actualBoards.columns.map((column) => {
        if (column.tasks === undefined) {
          column.tasks = [];
        }
      })

      console.log(actualBoards, 'actualBoards');

      const colunmByName = actualBoards.columns.filter((column) => column.name === tasksStatus)

      const tasks = {
        id: Math.floor(Math.random() * 100000000),
        title: taskTitle,
        description: tasksDescription,
        subtasks: subTasks,
        status: colunmByName[0].name,
      }

      const columns2 = {...colunmByName[0], tasks: [...colunmByName[0].tasks, tasks]}
    
      const actualColumns = actualBoards.columns.filter((column) => column.name !== tasksStatus)
    
      const actualBoardUpdate = {
        ...actualBoards, 
        columns: [...actualColumns, columns2],
        }
    
        const index = boardLocal.findIndex((board) => board.id === actualBoards.id);
        boardLocal[index] = actualBoardUpdate;
        localStorage.removeItem('board');
        localStorage.setItem('board', JSON.stringify(boardLocal));
        updateIsNewTask(false);
  };

  return (
    <div>
      <Modal
        isOpen={isNewTask}
        onRequestClose={() => updateIsNewTask(false)}
        contentLabel="Modal de exemplo"
        shouldCloseOnOverlayClick={true}
        style={customStyles}
      >
        <div className={styles.containerModal}>
          <div>
            <h2>{titleModal}</h2>
          </div>
          <form className={styles.formAdd}>
            <label>Title</label>
            <div>
              <input 
                className={styles.input}
                type="text" 
                placeholder="e.g. Take coffee break" 
                value={taskTitle}
                onChange={(e) => handleChange(e, setTaskTitle)}
              />
            </div>
            <label htmlFor="desc">Description</label>
            <div>
              <textarea 
                name="description"
                className={`${styles.input} ${styles.textarea}`} 
                id="desc" 
                maxLength={100}
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                value={tasksDescription}
                onChange={(e) => handleChange(e, setTasksdescription)}  
              />
            </div>
              <label>Subtaks</label>
            <div>

            {subTasks && subTasks.map((inputValue, index) => (
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
              + add new subtask
            </button>

            </div>

            <label htmlFor="">Status</label>
            <div>
              <select 
                name="" 
                id=""
                value={tasksStatus}
                onChange={(e) => handleChange(e, setTasksStatus)}  
                className={styles.input}
              >
                {actualBoards.columns.map((column, index) => (
                  <option
                    key={index}
                    value={column.name}
                  >
                    {column.name}
                  </option>
                ))}
                
              </select>
            </div>
            <button
              type="button"
              onClick={saveTask}
              className={` ${styles.btn} ${styles.btnPrimaryLight}`}
            >
              Create Task
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalAddTask;