// stores/useToastStore.ts
import { create } from 'zustand';

export type ToastType = 'error' | 'check' | 'caution' | 'info';

interface ToastState {
  isVisible: boolean;
  message: string;
  type: ToastType;
  show: (message: string, type: ToastType) => void;
  setIsVisible: (isOpen: boolean) => void;  // isOpen으로 매개변수명 변경
}

const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  message: '',
  type: 'check',
  show: (message: string, type: ToastType) => {
    set({ isVisible: true, message, type });
  },
  setIsVisible: (isOpen: boolean) => set({ isVisible: isOpen })  // isOpen을 isVisible로 변환
}));

export default useToastStore;