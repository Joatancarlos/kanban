import { create } from 'zustand'

const useStore = create((set) => ({
  isHidden: false,
  updateHidden: (hidden) => set(() => ({ isHidden: hidden })),
}))

export default useStore;