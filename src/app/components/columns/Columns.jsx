const Columns = ({columns}) => {
  return (
    <>

    {columns && columns.map(({name, tasks}) => (
      <div key={name}>

        <h3>{`${name} (${tasks ? tasks.length : "0"})`}</h3>

        {tasks && tasks.map(({id, title, description, status, subtasks}) => (
          <>
            <div key={id}>
              <h2>{title}</h2>
              <h2>{description}</h2>
              <h2>{status}</h2>
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

    </>
  )
}

export default Columns