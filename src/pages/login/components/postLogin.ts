import useMemberStore from '@/stores/useMemberStore';
import axiosInstance from '@/utils/axios';
import router from 'next/router';

interface postLoginProps {
  email: string;
  memberId: number;
}

const postLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post<postLoginProps>(
      'api/v1/login',
      data,
    );
    console.log('response', response.data);

    if (response.data.memberId) {
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('nickname', 'test');
      localStorage.setItem('email', response.data.email.toString());
      localStorage.setItem('memberId', response.data.memberId.toString());
      useMemberStore.getState().setIsLogin(true);
      router.push('/');
    }
  } catch (error) {
    console.error('로그인 요청 에러:', error);
  }
};

export default postLogin;
