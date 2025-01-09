import { create } from 'zustand';

interface modalStates {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const useModalStore = create<modalStates>((set) => ({
  showModal: false,
  setShowModal: (showModal: boolean) => set({ showModal }),
}));

export default useModalStore;
