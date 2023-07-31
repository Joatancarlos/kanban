import React from 'react'
import Modal from 'react-modal';

export default function ModalDelete({modalDeleteBoard, showDeleteBox, deleteFunction, nameBoard}) {
  const customStyles = {
    content: {
      width: '25vw', 
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <Modal
        isOpen={modalDeleteBoard}
        onRequestClose={showDeleteBox}
        contentLabel="Delete Modal"
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        ariaHideApp={false}
      >
        <div>
          <h3>Delete this board?</h3>
          <p>Are you sure you want to delete the '{nameBoard}' board? This action will remove all columns and tasks and cannot be reversed.</p>
          <button type="button" onClick={deleteFunction}>
            Delete
          </button>
          <button type="button" onClick={() => showDeleteBox()}>
            Cancel
          </button>
        </div>
      </Modal>
  )
}
