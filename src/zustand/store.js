import { create } from 'zustand'

const useStore = create((set) => ({
  isHidden: false,
  modalNewBoard: false,
  modalDeleteBoard: false,
  modalEditBoard: false,
  actualBoards: [],
  isDelete: false,
  isNewTask: false,
  taskModal: false,
  idTask:'',
  updateHidden: (hidden) => set(() => ({ isHidden: hidden })),
  updateModalNewBoard: (modalNewBoard) => set(() => ({ modalNewBoard: modalNewBoard })),
  updateActualBoards: (boards) => set(() => ({ actualBoards: boards })),
  updateModalDeleteBoard: (modalDeleteBoard) => set(() => ({ modalDeleteBoard: modalDeleteBoard })),
  updateIsDelete: (isDelete) => set(() => ({ isDelete: isDelete })),
  updateModalEditBoard: (modalEditBoard) => set(() => ({ modalEditBoard: modalEditBoard })),
  updateIsNewTask: (isNewTask) => set(() => ({ isNewTask: isNewTask })),
  updateTaskModal: (taskModal) => set(() => ({ taskModal: taskModal })),
  updateIdTask: (idTask) => set(() => ({ idTask: idTask })),
}))

export default useStore;