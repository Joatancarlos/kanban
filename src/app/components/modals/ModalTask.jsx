import React from 'react';
import Modal from 'react-modal';
import styles from '../../page.module.css';
import useStore from '@/zustand/store';

export default function ModalTask({ taskId, openModal, closeModal }) {
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

  // const [
  //   updateTaskModal,
  //   taskModal,
  // ] = useStore((state) => [
  //   state.updateTaskModal,
  //   state.taskModal,
  // ]);


  // const closeModal = () => {
  //   console.log('closeModal');
  //   console.log(taskModal, 'taskModal');
  //   updateTaskModal(!taskModal);
  //   console.log(taskModal, 'taskModal');
  // };

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
        <h1>Teste</h1>
        <p>Task ID: {taskId}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
}
