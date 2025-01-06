import RegisterInput from './registerInput';
// 태블릿 24, 모바일 14
// 회원가입 창 mt 140 글자 mb 50

export default function Register() {
  return (
    <div className="bg-black text-white mt-16 w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-[640px] w-1/3">
        <h1 className="mb-12 text-4xl font-medium">회원가입</h1>

        <form className="flex flex-col w-full px-6">
          <p className="mb-2.5">이메일</p>
          <RegisterInput type="email" placeholder="이메일을 입력해주세요" />

          <p className="mb-2.5">닉네임</p>
          <RegisterInput type="nickname" placeholder="이메일을 입력해주세요" />

          <p className="mb-2.5">비밀번호</p>
          <RegisterInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />

          <p className="mb-2.5">비밀번호 확인</p>
          <RegisterInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="mb-9"
          />

          <button className="w-full h-16 rounded-lg bg-primary text-lg font-semibold">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
