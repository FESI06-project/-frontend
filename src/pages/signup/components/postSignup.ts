import axiosInstance from '@/utils/axios';

interface postSignupProps {
  email: string;
  nickName: string;
  password: string;
}

const postSignup = async (data: {
  email: string;
  nickName: string;
  password: string;
}) => {
  try {
    console.log('data', data);
    console.log(JSON.stringify(data));
    const response = await axiosInstance.post<postSignupProps>(
      'api/v1/signup',
      data,
    );
    console.log('response', response.data);
  } catch (error) {
    console.error('회원가입 요청 에러:', error);
  }
};

export default postSignup;
