import { create } from 'zustand'

const useStore = create((set) => ({
  isHidden: false,
  modalNewBoard: false,
  boards: [
    {
      "name": "Platform Lounch",
      "columns": [
        {
          "name": "Todo",
          "tasks": [
            {
              "title": "Plan Product Hunt launch",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "title": "Find hunter",
                  "isCompleted": false
                }
              ]
            }
          ]
        }
      ]
    },
  ],
  updateHidden: (hidden) => set(() => ({ isHidden: hidden })),
  updateModalNewBoard: (modalNewBoard) => set(() => ({ modalNewBoard: modalNewBoard })),
}))

export default useStore;