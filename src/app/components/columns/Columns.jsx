"use client";
import styles from '../../page.module.css'
import useStore from '@/zustand/store';
import Task from './Task';

const Columns = ({columns}) => {
  const [
    updateModalEditBoard,
  ] = useStore((state) => [
    state.updateModalEditBoard,
  ]);

  return (
    <>

    {columns && columns.map(({name, tasks},i) => (
      <div className={styles.divColumns} key={`${name}-${i}`}>
        <h3 className={styles.titleColumn}>{`${name} (${tasks ? tasks.length : "0"})`}</h3>
        {tasks && tasks.map(({id, title, subtasks, description}) => (
            <Task 
              key={`${id}-${title}`}
              id={id}
              title={title}
              subtasks={subtasks}
              description={description}
            />
        ))}

      </div>

    ))}
    <button
      onClick={() => updateModalEditBoard(true)}
      className={styles.newColumn} type="button">
      + new column
    </button>
    </>
  )
}

export default Columns