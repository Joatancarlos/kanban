import React from 'react'

export default function EditDeleteBox({
  className,
  whosEdit,
  whosDelete,
  handleClickEdit,
  handleClickDelete
}) {
  return (
    <div className={className}>
      <button onClick={handleClickEdit}>
        {`Edit ${whosEdit}`}
      </button>
      <button onClick={handleClickDelete}>
        {`Delete ${whosDelete}`}
      </button>
    </div>
  )
}
