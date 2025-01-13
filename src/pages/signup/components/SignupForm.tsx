import Button from '@/components/common/Button';
import { useState } from 'react';
import postSignup from './postSignup';
import signupValidation from '@/utils/validation/signupValidation';
import router from 'next/router';
import FormField from './FormField';

// 회원가입 폼 컴포넌트
export default function SignupForm() {
  const [signupForm, setSignupForm] = useState({
    nickName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [signupFormError, setSignupFormError] = useState({
    nickName: false,
    email: false,
    password: false,
    passwordCheck: false,
  });

  // 인풋 값 변경 시 formData 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 포커스 아웃 시 유효성 검사
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    signupValidation({
      name: e.target.name,
      value: e.target.value,
      password: signupForm.password,
      setSignupFormError,
    });
  };

  // 회원가입 요청
  // 회원가입 쿠키 테스트용 코드, 이후 수정 예정
  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signupFormError.passwordCheck) {
      console.log(signupForm);
      console.log(signupForm.password);
      postSignup({
        email: signupForm.email,
        nickName: signupForm.nickName,
        password: signupForm.password,
      });
    }
  };

  return (
    <form
      onSubmit={handleSignupSubmit}
      className="flex flex-col w-full px-6 gap-6"
    >
      <FormField
        label="닉네임"
        type="text"
        name="nickName"
        value={signupForm.nickName}
        placeholder="닉네임을 입력해주세요"
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        hasError={signupFormError.nickName}
        errorMessage="닉네임은 2자 이상 10자 이하로 입력해주세요."
      />
      <FormField
        label="이메일"
        type="email"
        name="email"
        value={signupForm.email}
        placeholder="이메일을 입력해주세요"
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        hasError={signupFormError.email}
        errorMessage="유효한 이메일 주소를 입력해주세요."
      />
      <FormField
        label="비밀번호"
        type="password"
        name="password"
        value={signupForm.password}
        placeholder="비밀번호를 입력해주세요"
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        hasError={signupFormError.password}
        errorMessage="비밀번호는 최소 8자 이상이어야 합니다."
      />
      <FormField
        label="비밀번호 확인"
        type="password"
        name="passwordCheck"
        value={signupForm.passwordCheck}
        placeholder="비밀번호를 입력해주세요"
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        hasError={signupFormError.passwordCheck}
        errorMessage="비밀번호가 일치하지 않습니다."
      />
      <Button type="submit" name="회원가입" className="h-16 mt-3" />
      <div className="flex flex-row justify-end mt-3">
        <p className="mr-4 text-[1rem]">{'이미 회원이신가요?'}</p>
        <p
          onClick={() => router.push('/login')}
          className="text-[1rem] text-primary underline decoration-primary underline-offset-[5px] cursor-pointer"
        >
          {'로그인하기'}
        </p>
      </div>
    </form>
  );
}
