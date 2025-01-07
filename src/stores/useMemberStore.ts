import { create } from 'zustand';

interface memberStates {
  isLogin: boolean;
  nickname: string;
  setIsLogin: (isLogin: boolean) => void;
  setNickname: (nickname: string) => void;
}
const useMemberStore = create<memberStates>((set) => ({
  isLogin: false,
  nickname: 'initial nickname',
  setIsLogin: (isLogin: boolean) => set({ isLogin: isLogin }),
  setNickname: (nickname: string) => set({ nickname: nickname }),
}));

export default useMemberStore;
