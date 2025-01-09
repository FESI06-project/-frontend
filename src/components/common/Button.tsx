interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  name: string;
  style?: 'default' | 'register' | 'cancel';
  className?: string;
  handleButtonClick?: () => void;
}
/**
 * default: 회원가입, 로그인, 확인 등
 * register: 모임 만들기, 참여하기, 리뷰 작성하기
 * cancel: 참여 취소하기
 * ex) <Button type="submit" name="회원가입" />
 */

export default function Button({
  type = 'button',
  name,
  style = 'default',
  className = '',
  handleButtonClick,
}: ButtonProps) {
  const buttonStyles = {
    default:
      'w-full h-16 mt-9 rounded-[10px] bg-primary text-[1.125rem] font-semibold',
    register: 'w-40 h-10 mt-9 rounded-[10px] bg-primary text-[1rem]',
    cancel:
      'w-40 h-10 mt-9 rounded-[10px] opacity-100 outline outline-1 outline-primary text-[1rem]',
  };
  return (
    <button
      onClick={handleButtonClick}
      type={type}
      className={`${buttonStyles[style]} ${className}`}
    >
      {name}
    </button>
  );
}
