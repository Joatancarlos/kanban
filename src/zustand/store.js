import { create } from 'zustand'

const useStore = create((set) => ({
  isHidden: false,
  modalNewBoard: false,
  modalDeleteBoard: false,
  // actualBoardId: 1,
  actualBoards: {name: 'My board'},
  updateHidden: (hidden) => set(() => ({ isHidden: hidden })),
  updateModalNewBoard: (modalNewBoard) => set(() => ({ modalNewBoard: modalNewBoard })),
  updateActualBoards: (boards) => set(() => ({ actualBoards: boards })),
  updateModalDeleteBoard: (modalDeleteBoard) => set(() => ({ modalDeleteBoard: modalDeleteBoard })),
  // updateActualBoardId: (id) => set(() => ({ actualBoardId: id })),
}))

export default useStore;