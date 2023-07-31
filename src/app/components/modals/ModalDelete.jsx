import React from 'react'
import Modal from 'react-modal';

export default function ModalDelete({boardOrTask , modalDeleteBoard, showDeleteBox, deleteFunction, children}) {
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
          <h3>Delete this {boardOrTask}?</h3>
          <p>{children}</p>
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
