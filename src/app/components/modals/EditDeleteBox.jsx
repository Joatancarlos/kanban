import React from 'react'
import styles from '../../page.module.css'
// Este componente vai servir tanto para editar/deletar o board quanto para editar/deletar as tasks

export default function EditDeleteBox({
  whosEdit,
  whosDelete,
  handleClickEdit,
  handleClickDelete
}) {
  return (
    // o estilo aqui é só para poder ver o elemento na tela. Fique a vontade para mudar, caso queira.
    <div className={styles.editDeleteBox}>
      <button onClick={handleClickEdit}>
        {`Edit ${whosEdit}`}
      </button>
      <button onClick={handleClickDelete}>
        {`Delete ${whosDelete}`}
      </button>
    </div>
  )
}
