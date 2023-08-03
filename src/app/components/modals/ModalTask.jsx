import React from 'react';
import Modal from 'react-modal';
import styles from '../../page.module.css';

export default function ModalTask({ taskId, openModal, closeModal, title, description, subtasks }) {
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
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Delete Modal"
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={styles.modalDivDelete}>
        <h3>{title}</h3>
        <p>{description}</p>
        {subtasks && subtasks.map(({name}) => (
            <div>
              <input type="checkbox" name={name}/>
              <span>{name}</span>
            </div>
        ))}
      </div>
    </Modal>
  );
}
