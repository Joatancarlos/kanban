import { create } from 'zustand'

const useStore = create((set) => ({
  isHidden: false,
  modalNewBoard: false,
  modalDeleteBoard: false,
  actualBoards: {name: 'My board'},
  isDelete: false,
  updateHidden: (hidden) => set(() => ({ isHidden: hidden })),
  updateModalNewBoard: (modalNewBoard) => set(() => ({ modalNewBoard: modalNewBoard })),
  updateActualBoards: (boards) => set(() => ({ actualBoards: boards })),
  updateModalDeleteBoard: (modalDeleteBoard) => set(() => ({ modalDeleteBoard: modalDeleteBoard })),
  updateIsDelete: (isDelete) => set(() => ({ isDelete: isDelete })),
}))

export default useStore;