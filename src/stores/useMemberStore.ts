import { create } from 'zustand';

interface memberStates {
  isLogin: boolean;
  memberId: number;
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setMemberId: (memberId: number) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  setProfileImageUrl: (profileImageUrl: string | null) => void;
}
const useMemberStore = create<memberStates>((set) => ({
  isLogin: false,
  memberId: 0,
  nickname: '',
  email: '',
  profileImageUrl: null,
  setIsLogin: (isLogin: boolean) => set({ isLogin: isLogin }),
  setMemberId: (memberId: number) => set({ memberId: memberId }),
  setNickname: (nickname: string) => set({ nickname: nickname }),
  setEmail: (email: string) => set({ email: email }),
  setProfileImageUrl: (profileImageUrl: string | null) =>
    set({ profileImageUrl: profileImageUrl }),
}));

export default useMemberStore;
