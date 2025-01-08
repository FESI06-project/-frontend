import Image from 'next/image';
import { GatheringStateType } from '@/types';

interface EstablishmentStatusProps {
  gatheringState: GatheringStateType;
  className?: string;
}

export default function EstablishmentStatus({
  gatheringState,
  className = ''
}: EstablishmentStatusProps) {
  // 5명 이상이면 개설확정
  const isConfirmed = gatheringState.gatheringJoinedPeopleCount >= 5;

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
              className="rounded-full bg-primary ml-[2px]" // Tailwind 클래스 사용
            />
          </div>
        ) : (
          '개설대기'
        )}
      </span>
    </div>
  );
}
