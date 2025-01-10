import axiosInstance from '@/utils/axios';
<<<<<<< HEAD

interface postSignupProps {
  email: string;
  nickName: string;
  password: string;
=======
import router from 'next/router';

interface postSignupProps {
  message: string;
>>>>>>> ccbdc5fca1066179f4fd665919849ac451985686
}

const postSignup = async (data: {
  email: string;
  nickName: string;
  password: string;
}) => {
  try {
<<<<<<< HEAD
    console.log('data', data);
    console.log(JSON.stringify(data));
=======
>>>>>>> ccbdc5fca1066179f4fd665919849ac451985686
    const response = await axiosInstance.post<postSignupProps>(
      'api/v1/signup',
      data,
    );
<<<<<<< HEAD
    console.log('response', response.data);
=======
    if (response.data.message === '사용자 생성 성공') {
      console.log('회원가입 성공');
      router.push('/login');
    }
>>>>>>> ccbdc5fca1066179f4fd665919849ac451985686
  } catch (error) {
    console.error('회원가입 요청 에러:', error);
  }
};

export default postSignup;
