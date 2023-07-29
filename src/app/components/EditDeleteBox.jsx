import React from 'react'
// Este componente vai servir tanto para editar/deletar o board quanto para editar/deletar as tasks

export default function EditDeleteBox({
  whosEdit,
  whosDelete,
  handleClickEdit,
  handleClickDelete
}) {
  return (
    // o estilo aqui é só para poder ver o elemento na tela. Fique a vontade para mudar, caso queira.
    <div  style={{ position: 'absolute', top: '70px', left: '1250px', zIndex: '2 '}}>
      <button onClick={handleClickEdit}>
        {`Edit ${whosEdit}`}
      </button>
      <button onClick={handleClickDelete}>
        {`Delete ${whosDelete}`}
      </button>
    </div>
  )
}
