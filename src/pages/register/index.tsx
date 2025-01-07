import { useState } from 'react';
import Input from '../../components/Input';
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

  // 회원가입 정보 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-[640px] w-1/3">
        <h1 className="mb-12 text-[3.6rem] font-medium">회원가입</h1>

        <form className="flex flex-col w-full px-6">
          <p className="mb-2.5 text-[1.6rem]">이메일</p>
          <Input
            type="email"
            name="email"
            value={formData.email}
            placeholder="이메일을 입력해주세요"
            handleInputChange={handleInputChange}
          />

          <p className="mt-6 mb-2.5 text-[1.6rem]">닉네임</p>
          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            placeholder="닉네임을 입력해주세요"
            handleInputChange={handleInputChange}
          />

          <p className="mt-6 mb-2.5 text-[1.6rem]">비밀번호</p>
          <Input
            type="password"
            name="password"
            value={formData.password}
            placeholder="비밀번호를 입력해주세요"
            handleInputChange={handleInputChange}
          />

          <p className="mt-6 mb-2.5 text-[1.6rem]">비밀번호 확인</p>
          <Input
            type="password"
            name="passwordCheck"
            value={formData.passwordCheck}
            placeholder="비밀번호를 입력해주세요"
            handleInputChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full h-16 mt-9 rounded-lg bg-primary text-[1.8rem] font-semibold"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
