import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  // 로그인 정보 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-[640px] w-1/3">
        <h1 className="mb-12 text-[2.25rem] font-medium">{'로그인'}</h1>

        <form className="flex flex-col w-full px-6">
          <p className="mt-6 mb-2.5 text-[1rem]">이메일</p>
          <Input
            type="email"
            name="email"
            value={loginFormData.email}
            placeholder="이메일을 입력해주세요"
            handleInputChange={handleInputChange}
          />

          <p className="mt-6 mb-2.5 text-[1rem]">비밀번호</p>
          <Input
            type="password"
            name="password"
            value={loginFormData.password}
            placeholder="비밀번호를 입력해주세요"
            handleInputChange={handleInputChange}
          />

          <Button type="submit" name="로그인" />
        </form>
      </div>
    </div>
  );
}
