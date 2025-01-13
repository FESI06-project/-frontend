interface StatusTagProps {
  status: '시작전' | '진행중' | '종료됨' | '취소됨';
  className?: string;
}

export default function StatusTag({ status, className = '' }: StatusTagProps) {
  const baseStyles =
    'h-8 w-[106px] rounded-full flex items-center justify-center font-semibold';

  const statusText = {
    시작전: '시작 전',
    진행중: '진행중',
    종료됨: '종료됨',
    취소됨: '취소됨',
  };

  const backgroundStyles = {
    시작전: 'bg-black',
    진행중: 'bg-[#018632]',
    종료됨: 'bg-[#FFA811]',
    취소됨: 'bg-[#FF4C4C]',
  };

  const dotWrapperStyles = {
    시작전: 'bg-white/10', // 10% 투명도
    진행중: 'bg-white/20', // 20% 투명도
    종료됨: 'bg-white/10', // 10% 투명도
    취소됨: 'bg-white/10', // 10% 투명도
  };

  const dotStyles = {
    시작전: 'bg-white',
    진행중: 'bg-[#82CF76]',
    종료됨: 'bg-white',
    취소됨: 'bg-[#FF4C4C]',
  };

  return (
    <div
      className={`${baseStyles} ${backgroundStyles[status]} ${className} bg-opacity-55 relative`}
    >
      <div
        className={`absolute left-4 w-[13px] h-[13px] rounded-full ${dotWrapperStyles[status]} flex items-center justify-center`}
      >
        <div className={`w-[6px] h-[6px] rounded-full ${dotStyles[status]}`} />
      </div>
      <span className="ml-2 uppercase">{statusText[status]}</span>
    </div>
  );
}
