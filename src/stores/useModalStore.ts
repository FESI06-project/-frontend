/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export enum ModalType {
  PROFILE = 'profile',                 // 프로필 모달
  GUESTBOOK_WRITE = 'guestbook_write', // 방명록 작성 모달
  GUESTBOOK_EDIT = 'guestbook_edit',   // 방명록 수정 모달
  GATHERING_CREATE = 'gathering_create',//모임 만들기 모달
  GATHERING_EDIT = 'gathering_edit',//모임 수정 모달
  CHALLENGE_CREATE = 'challenge_create',//챌린지 만들기 모달
  CHALLENGE_VERIFY = 'challenge_verify',//챌린지 인증모달 
}
// 각 모달에서 사용될 데이터 타입을 정의
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