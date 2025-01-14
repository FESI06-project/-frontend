import { useState } from 'react';
import Button from '@/components/common/Button';
import postLogin from './postLogin';
import router from 'next/router';
import FormField from '@/pages/signup/components/FormField';

export default function LoginForm() {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  // 유효성 검사 결과 저장
  const [loginFormError, setLoginFormError] = useState({
    email: false,
    password: false,
  });

  // 로그인 정보 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 포커스 아웃 시 특정 필드 유효성 검사
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === 'email') {
      setLoginFormError((prev) => ({
        ...prev,
        [name]: value.trim() === '' || !emailRegex.test(value.trim()),
      }));
    } else if (name === 'password') {
      setLoginFormError((prev) => ({
        ...prev,
        [name]: value.trim() === '',
      }));
    }
  };

  // 로그인 요청
  // 로그인 쿠키 테스트용 코드, 이후 수정 예정
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginFormData);
    postLogin({
      email: loginFormData.email,
      password: loginFormData.password,
    });
  };

  return (
    <form
      onSubmit={handleLoginSubmit}
      className="flex flex-col w-full px-6 gap-6"
    >
      <FormField
        label="이메일"
        type="email"
        name="email"
        value={loginFormData.email}
        placeholder="이메일을 입력해주세요"
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        hasError={loginFormError.email}
        errorMessage="유효한 이메일 주소를 입력해주세요."
      />

      <FormField
        label="비밀번호"
        type="password"
        name="password"
        value={loginFormData.password}
        placeholder="비밀번호를 입력해주세요"
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        hasError={loginFormError.password}
        errorMessage="비밀번호를 입력해주세요."
      />

      <Button type="submit" name="로그인" />
      <div className="flex flex-row justify-end mt-9">
        <p className="mr-4 text-[1rem]">{'아직 회원이 아니신가요?'}</p>
        <p
          onClick={() => router.push('/signup')}
          className="text-[1rem] text-primary underline decoration-primary underline-offset-[5px] cursor-pointer"
        >
          {'회원가입하기'}
        </p>
      </div>
    </form>
  );
}
