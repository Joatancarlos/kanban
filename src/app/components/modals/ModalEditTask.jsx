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
    isDarkMode,
  ] = useStore((state) => [
    state.actualBoards,
    state.modalDeleteTask,
    state.modalEditTask,
    state.updateModalDeleteTask,
    state.updateModalEditTask,
    state.updateActualBoards,
    state.isDarkMode,
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
      backgroundColor: isDarkMode ? "#2B2C37" : "#fff",
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
    if (columnEdit.id !== tasksStatus) {
      const newTasks = columnEdit.tasks.filter((column) => column.id !== taskId);
    // achar a coluna que tem a task e atualizar seu valor
    const indiceDaColunaQContemATask = actualBoards.columns.findIndex((column) => column.id === columnEdit.id)
    actualBoards.columns[indiceDaColunaQContemATask].tasks = newTasks;

    const indiceDaBoardAtual = boardLocal.findIndex((board) => board.id === actualBoards.id);

    boardLocal[indiceDaBoardAtual] = actualBoards;
    
    // Salvar no localStorage
    localStorage.removeItem('board');
    localStorage.setItem('board', JSON.stringify(boardLocal));

      // Filtrar a tarefa da coluna original
      const columnWithoutTask = columnEdit.tasks.filter((task) => task.id !== idTask);
      setColumnWithoutTask(columnWithoutTask);
  
      // Obter a coluna de destino
      const targetColumn = actualBoards.columns.find((column) => column.id === tasksStatus);
  
      // Atualizar a propriedade tasks da coluna de destino com a tarefa editada
      const taskEdit = {
        id: idTask,
        title: taskTitle,
        description: tasksDescription,
        subtasks: subTasks,
        status: tasksStatus,
      };
  
      const updatedTasks = [...targetColumn.tasks, taskEdit];
  
      const columnWithEditedTask = {
        ...targetColumn,
        tasks: updatedTasks,
      };
  
      // Atualizar o array actualBoards.columns para refletir as alterações
      const updatedColumns = actualBoards.columns.map((column) => {
        if (column.id === tasksStatus) {
          return columnWithEditedTask;
        }
        return column;
      });
  
      const updatedBoard = {
        ...actualBoards,
        columns: updatedColumns,
      };
  
      // Atualizar o estado com o board atualizado
      updateActualBoards(updatedBoard);
  
      // Atualizar o local storage
      const updatedBoardLocal = boardLocal.map((board) => {
        if (board.id === actualBoards.id) {
          return updatedBoard;
        }
        return board;
      });
  
      localStorage.removeItem('board');
      localStorage.setItem('board', JSON.stringify(updatedBoardLocal));
    } else {
      // Se a coluna permanecer a mesma, apenas atualize a tarefa dentro da mesma coluna
      const taskEdit = {
        id: idTask,
        title: taskTitle,
        description: tasksDescription,
        subtasks: subTasks,
        status: tasksStatus,
      };
  
      const updatedTasks = tasks.map((task) => {
        if (task.id === idTask) {
          return taskEdit;
        }
        return task;
      });
  
      const columnWithEditedTask = {
        ...columnEdit,
        tasks: updatedTasks,
      };
  
      const updatedColumns = actualBoards.columns.map((column) => {
        if (column.id === tasksStatus) {
          return columnWithEditedTask;
        }
        return column;
      });
  
      const updatedBoard = {
        ...actualBoards,
        columns: updatedColumns,
      };
  
      // Atualizar o estado com o board atualizado
      updateActualBoards(updatedBoard);
  
      // Atualizar o local storage
      const updatedBoardLocal = boardLocal.map((board) => {
        if (board.id === actualBoards.id) {
          return updatedBoard;
        }
        return board;
      });
  
      localStorage.removeItem('board');
      localStorage.setItem('board', JSON.stringify(updatedBoardLocal));
    }
  
    closeModal(!openModal);
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
