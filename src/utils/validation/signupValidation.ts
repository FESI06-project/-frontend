export interface SignupValidationProps {
  name: string;
  value: string;
  password: string;
  setSignupFormError: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      nickName: boolean;
      password: boolean;
      passwordCheck: boolean;
    }>
  >;
}

// 회원가입 유효성 검사
export default function signupValidation({
  name,
  value,
  password,
  setSignupFormError,
}: SignupValidationProps) {
  // 닉네임 유효성 검사
  const NicknameValidation = () => {
    setSignupFormError((prev) => ({
      ...prev,
      [name]: value.length < 2 || value.length > 10,
    }));
  };

  // 이메일 유효성 검사
  const EmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setSignupFormError((prev) => ({
      ...prev,
      [name]: !emailRegex.test(value),
    }));
  };
  // 비밀번호 유효성 검사
  const PasswordValidation = () => {
    setSignupFormError((prev) => ({
      ...prev,
      [name]: value.length < 8,
    }));
  };
  // 비밀번호 확인 검사
  const PasswordCheckValidation = () => {
    setSignupFormError((prev) => ({
      ...prev,
      [name]: value.length == 0 || value !== password,
    }));
  };

  if (name === 'nickName') {
    NicknameValidation();
  } else if (name === 'email') {
    EmailValidation();
  } else if (name === 'password') {
    PasswordValidation();
  } else if (name === 'passwordCheck') {
    PasswordCheckValidation();
  }
}
