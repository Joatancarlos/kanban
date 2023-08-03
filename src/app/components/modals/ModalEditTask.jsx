import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '../../page.module.css';
import useStore from '@/zustand/store';
import InputColumn from './InputColumn';

export default function ModalEditTask({ openModal, closeModal, title, columnEdit, taskId, boardLocal }) {
  console.log(columnEdit.id, 'columnEdit');
  console.log(taskId, 'taskId');
  const [
    actualBoards,
    modalDeleteTask,
    modalEditTask,
    updateModalDeleteTask,
    updateModalEditTask,
    updateActualBoards,
  ] = useStore((state) => [
    state.actualBoards,
    state.modalDeleteTask,
    state.modalEditTask,
    state.updateModalDeleteTask,
    state.updateModalEditTask,
    state.updateActualBoards,
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [tasks, setTasks] = useState(columnEdit.tasks);

  const [taskTitle, setTaskTitle] = useState(columnEdit.tasks[0].title);
  const [tasksDescription, setTasksdescription] = useState(columnEdit.tasks[0].description);
  const [tasksStatus, setTasksStatus] = useState(columnEdit.id);
  const [subTasks, setSubTasks] = useState(columnEdit.tasks[0].subtasks);
  const [idTask, setIdTask] = useState(columnEdit.id);
  const [column, setColumn] = useState(columnEdit);
  const [columnWithoutTask, setColumnWithoutTask] = useState({});


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

  const saveInfoTasksState = () => {
    const taskToEdit = columnEdit.tasks.find((task) => task.id === taskId);
    
    setIdTask(taskToEdit.id);
    setTaskTitle(taskToEdit.title);
    setTasksdescription(taskToEdit.description);
    setSubTasks(taskToEdit.subtasks);
    console.log(tasks, 'tasks');
  };

  // useEffect(() => {
  //   setTasks(columnEdit.tasks);
  // }, [columnEdit.tasks]);

  useEffect(() => {
    saveInfoTasksState();
  }, [actualBoards]);

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
    const newInputs = [...subTasks];
    const newInput = newInputs.filter((_col, i) => i !== index);
    setSubTasks(newInput);
  };  

  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
    handleCheckInput(value);
  };

  const saveTask = () => {
    // console.log(columnEdit.id, 'columnEdit.id');
    // console.log(tasksStatus, 'tasksStatus');
    if (columnEdit.id !== tasksStatus) { 

    
      const columnWithoutTask = columnEdit.tasks.filter((task) => task.id !== idTask);
      setColumnWithoutTask(columnWithoutTask);

      const colunmById = actualBoards.columns.filter((column) => column.id === tasksStatus);
  
      setTasks(colunmById.tasks);
      setColumn(colunmById[0]);
    }
  
    // console.log(tasks, 'tasks');
    console.log(idTask, 'idTask');
    console.log(columnEdit.tasks, 'columnEdit.tasks');
    // console.log(taskTitle, 'taskTitle');
    // console.log(tasksDescription, 'tasksDescription');
    // console.log(subTasks, 'subTasks');
    // console.log(tasksStatus, 'tasksStatus');
    console.log(columnWithoutTask, 'columnWithoutTask');

    const taskEdit = {
      id: idTask,
      title: taskTitle,
      description: tasksDescription,
      subtasks: subTasks,
      status: tasksStatus,
    };
  
    const tasksWithoutEditing = tasks.filter((task) => task.id !== idTask);
  
    console.log(tasksWithoutEditing, 'tasksWithoutEditing');

    const updatedTasks = [...tasksWithoutEditing, taskEdit];
    
    console.log(updatedTasks, 'updatedTasks');

    const actualtask = updatedTasks.map((task) => {
      if (task.id === idTask) {
        return taskEdit;
      }
      return task;
    });
  
    console.log(actualtask, 'actualtask');

    const columnWithEditedTask = {
      ...column,
      tasks: actualtask,
    };
  
    console.log(columnWithEditedTask, 'columnWithEditedTask');

    const actualColumns = actualBoards.columns.map((column) => {
      if (column.id === tasksStatus) {
        return columnWithEditedTask;
      }
      return column;
    });
    
    console.log(actualColumns, 'actualColumns');
  
    const actualBoardUpdate = {
      ...actualBoards, 
      columns: [
        ...actualColumns
      ],
    };
  
    console.log(actualBoardUpdate, 'actualBoardUpdate');
    
    const updatedBoardLocal = boardLocal.map((board) => {
      if (board.id === actualBoards.id) {
        return actualBoardUpdate;
      }
      return board;
    });

    console.log(updatedBoardLocal, 'updatedBoardLocal');
  
    localStorage.removeItem('board');
    localStorage.setItem('board', JSON.stringify(updatedBoardLocal));
    updateActualBoards(actualBoardUpdate);
    closeModal(!openModal)
  };

  return (
    <div>
    <Modal
      isOpen={openModal}
      onRequestClose={() => closeModal(!openModal)}
      contentLabel="Modal de exemplo"
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      <div className={styles.containerModal}>
        <div>
          <h3>{title}</h3>
        </div>
        <form className={styles.formAdd}>
          <label className={styles.label}>Title</label>
          <div>
            <input 
              className={styles.input}
              type="text" 
              placeholder="e.g. Take coffee break" 
              value={taskTitle}
              onChange={(e) => handleChange(e, setTaskTitle)}
            />
          </div>
          <label className={styles.label} htmlFor="desc">Description</label>
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
          <label className={styles.label} >Subtaks</label>

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


          <label className={styles.label} htmlFor="">Status</label>
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
            Edit Task
          </button>
        </form>
      </div>
    </Modal>
  </div>
  );
}
