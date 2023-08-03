import React, { useState } from 'react'
import ModalTask from '../modals/ModalTask';
import styles from '../../page.module.css';
import useStore from '@/zustand/store';


export default function Task({id, title, subtasks}) {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  // const [
  //   updateTaskModal,
  //   taskModal,
  //   idTask,
  // ] = useStore((state) => [
  //   state.updateTaskModal,
  //   state.taskModal,
  //   state.idTask,
  // ]);

  // console.log(idTask, 'idTask');

  const toggleTask = () => {
    setIsTaskOpen((prevState) => !prevState);
  };

  // const modalOpen = idTask === id;
  // // console.log(modalOpen, 'modalOpen');

  // console.log(taskModal, 'taskModal');
  return (
    <div onClick={toggleTask} className={styles.divTask}>    
      <h3>{title}</h3>
      <p>{`0 of ${subtasks.length} subtasks`}</p>
      {isTaskOpen && (
        <ModalTask
          openModal={isTaskOpen}
          taskId={id}
          closeModal={toggleTask}
        />
      )}
    </div>
  )
}

{/* <div>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div>
          {subtasks && 
            subtasks.map(({id, title}) => (
              <div key={id}>
                <h2>{title}</h2>
              </div>
            ))}
        </div>
    </div> */}
