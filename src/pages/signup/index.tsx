import { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '@/components/common/Button';
import SignupValidation from './components/SignupValidation';
import postSignup from './components/postSignup';
// 태블릿 24, 모바일 14
// 회원가입 창 mt 140 글자 mb 50

// React Hook Form 사용?

export default function Signup() {
  const [formData, setFormData] = useState({
    nickName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [formDataError, setFormDataError] = useState({
    nickName: false,
    email: false,
    password: false,
    passwordCheck: false,
  });

  // 회원가입 정보 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    SignupValidation({
      name: e.target.name,
      value: e.target.value,
      password: formData.password,
      setFormDataError,
    });
  };

  // 회원가입 요청
  // 회원가입 쿠키 테스트용 코드, 이후 수정 예정
  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formDataError.passwordCheck) {
      console.log(formData);
      console.log(formData.password);
      postSignup({
        email: formData.email,
        nickName: formData.nickName,
        password: formData.password,
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-[640px] w-1/3">
        <h1 className="mb-12 text-[2.25rem] font-medium">회원가입</h1>

        <form
          onSubmit={handleSignupSubmit}
          className="flex flex-col w-full px-6"
        >
          <p className="mb-2.5 text-[1rem]">닉네임</p>
          <Input
            type="text"
            name="nickName"
            value={formData.nickName}
            placeholder="닉네임을 입력해주세요"
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            className={formDataError.nickName ? 'mb-3' : ''}
          />
          {formDataError.nickName && (
            <p className="mt-3 text-[0.875rem] text-error">
              {'닉네임은 2자 이상 10자 이하로 입력해주세요.'}
            </p>
          )}

          <p className="mt-6 mb-2.5 text-[1rem]">이메일</p>
          <Input
            type="email"
            name="email"
            value={formData.email}
            placeholder="이메일을 입력해주세요"
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            className={formDataError.email ? 'mb-3' : ''}
          />
          {formDataError.email && (
            <p className="mt-3 text-[0.875rem] text-error">
              {'유효한 이메일 주소를 입력해주세요.'}
            </p>
          )}

          <p className="mt-6 mb-2.5 text-[1rem]">비밀번호</p>
          <Input
            type="password"
            name="password"
            value={formData.password}
            placeholder="비밀번호를 입력해주세요"
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            className={formDataError.password ? 'mb-3' : ''}
          />
          {formDataError.password && (
            <p className="mt-3 text-[0.875rem] text-error">
              {'비밀번호는 최소 8자 이상이어야 합니다.'}
            </p>
          )}

          <p className="mt-6 mb-2.5 text-[1rem]">비밀번호 확인</p>
          <Input
            type="password"
            name="passwordCheck"
            value={formData.passwordCheck}
            placeholder="비밀번호를 입력해주세요"
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            className={formDataError.passwordCheck ? 'mb-3' : 'mb-9'}
          />
          {formDataError.passwordCheck && (
            <p className="mt-3 text-[0.875rem] text-error">
              {'비밀번호가 일치하지 않습니다.'}
            </p>
          )}
          <Button type="submit" name="회원가입" />
          <div className="flex flex-row justify-end mt-9">
            <p className="mr-4 text-[1rem]">{'이미 회원이신가요?'}</p>
            <p className="text-[1rem] text-primary underline decoration-primary underline-offset-[5px] cursor-pointer">
              {'로그인하기'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
