import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import verticalEllipsis from '../../../images/icon-vertical-ellipsis.svg';
import styles from '../../page.module.css';
import useStore from '@/zustand/store';
import EditDeleteBox from './EditDeleteBox';
import ModalDelete from './ModalDelete';
import ModalEditTask from './ModalEditTask';
import { getSavedBoards } from '@/helpers/boardLocal';


export default function ModalTask({ openModal, closeModal, title, description, subtasks, columns, taskId }) {
  const [
    actualBoards,
    modalDeleteTask,
    modalEditTask,
    modalNewBoard,
    updateModalDeleteTask,
    updateModalEditTask
  ] = useStore((state) => [
    state.actualBoards,
    state.modalDeleteTask,
    state.modalEditTask,
    state.modalNewBoard,
    state.updateModalDeleteTask,
    state.updateModalEditTask,
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [tasksStatus, setTasksStatus] = useState(actualBoards.columns[0].id);
  const [checkActive, setCheckActive] = useState(0);
  const [checked, setChecked] = useState([]);
  const myElementRef = useRef(null);

  const customStyles = {
    content: {
      width: '520px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.4s ease-in-out',
    },
  };

  const [boardLocal, setBoardLocal] = useState([]);

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        // console.log(boards, 'boards');
        // valores atualizados
        setBoardLocal(boards)
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } else {
      setBoardLocal([])
    }
  }, [modalNewBoard, actualBoards]);
  
  const handleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
    setCheckActive(newChecked.filter((item) => item === true).length);
    // if(target.contains(input.current)){
    //   console.log(input.current);
      
    // }
  }
  const handleClickOutside = (event) => {
    // console.log(myElementRef);
    // console.log(event.target);

    if (myElementRef.current && !myElementRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const showEditBox = () => {
    updateModalEditTask(!modalEditTask);
  }
  
  const showDeleteBox = () => {
    updateModalDeleteTask(!modalDeleteTask);
  }

  const deleteBoard = () => {
    console.log('delete board');
  }

    
  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
    handleCheckInput(value);
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Delete Modal"
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={styles.containerModal}>
        <div className={styles.headerModal}>
          <h3>{title}</h3>
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
        </div>
        <p className={styles.description}>{description}</p>
        <label className={styles.label} htmlFor="">Subtasks ({checkActive} of {subtasks.length})</label>
        {subtasks && subtasks.map(({name}, index) => (
            <label className={styles.check} htmlFor={name} onChange={() => handleCheck(index)}>
              <input type="checkbox" checked={ checked[index] } name={name} id={name}/>
              <span>{name}</span>
            </label>
        ))}
        <label className={styles.label} htmlFor="">Current Status</label>
        <div>
            <select 
              name="" 
              id=""
              value={tasksStatus}
              onChange={(e) => handleChange(e, setTasksStatus)}  
              className={`${styles.input} ${styles.select}`}
            >
              {actualBoards.columns.map((column, index) => (
                <option
                  key={index}
                  value={column.id}
                >tasks
                  {column.name}
                </option>
              ))}
              
            </select>
        </div>
        {isVisible && (
          <EditDeleteBox
            whosEdit="Task"
            whosDelete="Task"
            handleClickEdit={showEditBox}
            handleClickDelete={showDeleteBox}
          />  
        )}
        <ModalDelete 
          boardOrTask={'task'}
          modalDeleteBoard={modalDeleteTask} 
          showDeleteBox={showDeleteBox}
          deleteFunction={deleteBoard}
        >
          {`Are you sure you want to delete the '${title}' task and its subtasks? This action cannot be reversed.`}
        </ModalDelete>
      </div>
      <ModalEditTask 
        openModal={modalEditTask}
        closeModal={updateModalEditTask}
        title="Edit Task"
        columnEdit={columns}
        taskId={taskId} 
        boardLocal={boardLocal}
      />
    </Modal>
  );
}
