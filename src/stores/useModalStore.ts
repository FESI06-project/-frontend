// stores/useModalStore.ts
import { create } from 'zustand';

export enum ModalType {
  PROFILE = 'profile',
  GUESTBOOK_WRITE = 'guestbook_write',
  GUESTBOOK_EDIT = 'guestbook_edit',
  GUESTBOOK_DELETE = 'guestbook_delete',  
  GATHERING_CREATE = 'gathering_create',
  GATHERING_EDIT = 'gathering_edit',
  CHALLENGE_CREATE = 'challenge_create',
  CHALLENGE_VERIFY = 'challenge_verify',
}

interface ModalState {
  activeModal: ModalType | null;
  modalProps: Record<string, any>;
  openModal: (type: ModalType, props?: Record<string, any>) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalProps: {},
  openModal: (type, props = {}) => set({ activeModal: type, modalProps: props }),
  closeModal: () => set({ activeModal: null, modalProps: {} }),
}));

export default useModalStore;