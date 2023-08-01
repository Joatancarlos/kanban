import React from 'react'
import Modal from 'react-modal';
import styles from '../../page.module.css'

export default function ModalDelete({boardOrTask , modalDeleteBoard, showDeleteBox, deleteFunction, children}) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.4s ease-in-out',
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
        <div className={styles.modalDivDelete}>
          <h3 className={styles.titleDelete}>Delete this {boardOrTask}?</h3>
          <p className={styles.txtDelete}>{children}</p>
          <div className={styles.buttonsDelete}>
            <button className={styles.btn} type="button" onClick={deleteFunction}>
              Delete
            </button>
            <button className={styles.btnSecondaryLight} type="button" onClick={() => showDeleteBox()}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
  )
}
