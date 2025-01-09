import { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '@/components/common/Button';
// 태블릿 24, 모바일 14
// 회원가입 창 mt 140 글자 mb 50

// React Hook Form 사용?

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  const [formDataError, setFormDataError] = useState({
    email: false,
    nickname: false,
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

  // 회원가입 유효성 검사
  const handleRegisterBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setFormDataError((prev) => ({
          ...prev,
          [name]: true,
        }));
      } else {
        setFormDataError((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    } else if (name === 'nickname') {
      // 닉네임 유효성 검사
      if (value.length < 2 || value.length > 10) {
        setFormDataError((prev) => ({
          ...prev,
          [name]: true,
        }));
      } else {
        setFormDataError((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    } else if (name === 'password') {
      // 비밀번호 유효성 검사
      if (value.length < 8) {
        setFormDataError((prev) => ({
          ...prev,
          [name]: true,
        }));
      } else {
        setFormDataError((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    } else if (name === 'passwordCheck') {
      // 비밀번호 확인 검사
      if (value.length == 0 || value !== formData.password) {
        setFormDataError((prev) => ({
          ...prev,
          [name]: true,
        }));
        console.log(name, formData.passwordCheck, value);
      } else {
        setFormDataError((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-[640px] w-1/3">
        <h1 className="mb-12 text-[2.25rem] font-medium">회원가입</h1>

        <form className="flex flex-col w-full px-6">
          <p className="mb-2.5 text-[1rem]">이메일</p>
          <Input
            type="email"
            name="email"
            value={formData.email}
            placeholder="이메일을 입력해주세요"
            handleInputChange={handleInputChange}
            handleBlur={handleRegisterBlur}
            className={formDataError.email ? 'mb-3' : ''}
          />
          {formDataError.email && (
            <p className="mt-3 text-[0.875rem] text-error">
              {'유효한 이메일 주소를 입력해주세요.'}
            </p>
          )}

          <p className="mt-6 mb-2.5 text-[1rem]">닉네임</p>
          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            placeholder="닉네임을 입력해주세요"
            handleInputChange={handleInputChange}
            handleBlur={handleRegisterBlur}
            className={formDataError.nickname ? 'mb-3' : ''}
          />
          {formDataError.nickname && (
            <p className="mt-3 text-[0.875rem] text-error">
              {'닉네임은 2자 이상 10자 이하로 입력해주세요.'}
            </p>
          )}

          <p className="mt-6 mb-2.5 text-[1rem]">비밀번호</p>
          <Input
            type="password"
            name="password"
            value={formData.password}
            placeholder="비밀번호를 입력해주세요"
            handleInputChange={handleInputChange}
            handleBlur={handleRegisterBlur}
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
            handleBlur={handleRegisterBlur}
            className={formDataError.passwordCheck ? 'mb-3' : ''}
          />
          {formDataError.passwordCheck && (
            <p className="mt-3 text-[0.875rem] text-error">
              {'비밀번호가 일치하지 않습니다.'}
            </p>
          )}
          <Button type="submit" name="회원가입" />
          <div className="flex flex-row justify-end mt-9">
            <p className="mr-4 text-[1rem]">{'이미 회원이신가요?'}</p>
            <p className="text-[1.125rem] text-primary cursor-pointer">
              {'로그인하기'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
