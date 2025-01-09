import Image from 'next/image';

interface OpenStatusProps {
  gatheringJoinedPeopleCount: number;
  className?: string;
}

export default function OpenStatus({
  gatheringJoinedPeopleCount,
  className = ''
}: OpenStatusProps) {
  // 5명 이상이면 개설확정
  const isConfirmed = gatheringJoinedPeopleCount >= 5;

  return (
    <div className={`text-left ${className}`}>
      <span
        className={`font-semibold  ${isConfirmed ? 'text-primary' : 'text-dark-700'
          }`}
      >
        {isConfirmed ? (
          <div className="flex items-center gap-[2px]">
            <span>개설확정</span>
            <Image
              src="/assets/image/open-check.svg"
              alt="확정"
              width={16}
              height={16}
              className="rounded-full bg-primary ml-[2px]" 
            />
          </div>
        ) : (
          '개설대기'
        )}
      </span>
    </div>
  );
}
