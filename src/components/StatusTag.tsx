interface StatusTagProps {
    status: '모집중' | '진행중' | '완료';
    className?: string;
  }
  
  export default function StatusTag({ status, className = '' }: StatusTagProps) {

    const baseStyles = "h-8 w-[106px] rounded-full flex items-center justify-center font-semibold";
    
    const statusText = {
      '모집중': '시작 전',
      '진행중': '진행중',
      '완료': '종료됨'
    };
    
    const backgroundStyles = {
      '모집중': "bg-black",
      '진행중': "bg-[#018632]",
      '완료': "bg-[#FFA811]"
    };
  
    const dotWrapperStyles = {
      '모집중': "bg-white/10",  // 10% 투명도
      '진행중': "bg-white/20",  // 20% 투명도
      '완료': "bg-white/10"     // 10% 투명도
    };
  
    const dotStyles = {
      '모집중': "bg-white",
      '진행중': "bg-[#82CF76]",
      '완료': "bg-white"
    };
  
    return (
      <div className={`${baseStyles} ${backgroundStyles[status]} ${className} bg-opacity-55 relative`}>
        <div className={`absolute left-4 w-[13px] h-[13px] rounded-full ${dotWrapperStyles[status]} flex items-center justify-center`}>
          <div className={`w-[6px] h-[6px] rounded-full ${dotStyles[status]}`} />
        </div>
        <span className="ml-2 uppercase">{statusText[status]}</span>
      </div>
    );
  }

  //<StatusTag status={gathering.gatheringStatus} />