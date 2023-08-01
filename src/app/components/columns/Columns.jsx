import styles from '../../page.module.css'

const Columns = ({columns}) => {
  return (
    <>

    {columns && columns.map(({name, tasks}) => (
      <div className={styles.divColumns} key={name}>

        <h3 className={styles.titleColumn}>{`${name} (${tasks ? tasks.length : "0"})`}</h3>

        {tasks && tasks.map(({id, title, description, status, subtasks}) => (
          <>
            <div key={id}>
              <h3>{title}</h3>
              <p>{description}</p>
              <span>{status}</span>
            </div>
            <div>
              {subtasks && 
                subtasks.map(({id, title}) => (
                  <div key={id}>
                    <h2>{title}</h2>
                  </div>
                ))}
            </div>
          </>
        ))}

      </div>

    ))}
    <button className={styles.newColumn} type="button">
      + new column
    </button>
    </>
  )
}

export default Columns