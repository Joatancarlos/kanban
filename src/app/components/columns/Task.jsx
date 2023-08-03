import React, { useState } from 'react'
import ModalTask from '../modals/ModalTask';
import styles from '../../page.module.css';

export default function Task({id, title, subtasks, description, columns}) {
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const toggleTask = () => {
    setIsTaskOpen(!isTaskOpen);
  };

  const columnByTask = columns.find((column) => column.tasks
    .find((task) => task.id === id));

  return (
    <div>
      <div onClick={toggleTask} className={styles.divTask}>
        <h3>{title}</h3>
        <p>{`0 of ${subtasks.length} subtasks`}</p>
      </div>
        <ModalTask
          openModal={isTaskOpen}
          taskId={id}
          closeModal={toggleTask}
          title={title}
          subtasks={subtasks}
          description={description}
          columns={columnByTask}
        />
    </div>
  )
}




