import axiosInstance from '@/utils/axios';
import router from 'next/router';

interface postSignupProps {
  message: string;
}

const postSignup = async (data: {
  email: string;
  nickName: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post<postSignupProps>(
      'api/v1/signup',
      data,
    );
    if (response.data.message === '사용자 생성 성공') {
      console.log('회원가입 성공');
      router.push('/login');
    }
  } catch (error) {
    console.error('회원가입 요청 에러:', error);
    alert('회원가입에 실패했습니다.');
  }
};

export default postSignup;
