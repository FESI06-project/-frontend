import { create } from 'zustand';

interface memberStates {
  isLogin: boolean;
  nickname: string;
  email: string;
  memberId: number;
  setIsLogin: (isLogin: boolean) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  setMemberId: (memberId: number) => void;
}
const useMemberStore = create<memberStates>((set) => ({
  isLogin: false,
  nickname: '',
  email: '',
  memberId: 0,
  setIsLogin: (isLogin: boolean) => set({ isLogin: isLogin }),
  setNickname: (nickname: string) => set({ nickname: nickname }),
  setEmail: (email: string) => set({ email: email }),
  setMemberId: (memberId: number) => set({ memberId: memberId }),
}));

export default useMemberStore;
