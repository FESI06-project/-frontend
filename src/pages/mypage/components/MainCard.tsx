import Image from 'next/image';
import StatusTag from '@/components/tag/StatusTag';
import OpenStatus from '@/components/tag/OpenStatus';
import Button from '@/components/common/Button';
import { GatheringItem, GatheringStateType } from '@/types';

interface MainCardProps {
  gathering: GatheringItem;
  state: GatheringStateType;
  onCancelReservation: (gatheringId: number) => void;
}

export default function MainCard({ gathering, state, onCancelReservation }: MainCardProps) {
  // gathering 객체가 유효한지 확인
  if (!gathering || !gathering.gatheringImage) {
    return null; // 또는 기본 UI 렌더링
  }
  return (
    <div className="flex w-[906px] h-[200px] gap-[30px]">
      {/* 이미지 영역 */}
      <div className="relative w-[300px] h-[200px]">
        <Image
          src={gathering.gatheringImage === "null" || !gathering.gatheringImage
            ? '/assets/image/default_img.png'
            : gathering.gatheringImage}
          alt={gathering.gatheringTitle || '기본 이미지'}
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-[20px]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/assets/image/default_img.png';
          }}
        />
        <div className="absolute bottom-4 left-5">
          <StatusTag status={gathering.gatheringStatus} />
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col flex-1 py-[19px]">
        <span className="text-primary font-normal mb-3.5">
          {gathering.gatheringSubType} | {gathering.gatheringSi} {gathering.gatheringGu}
        </span>
        <span className="text-xl font-bold mb-3.5">{gathering.gatheringTitle}</span>
        <div className="flex items-center gap-[10px] text-dark-700 mb-[21px]">
          <span>{gathering.gatheringStartDate} ~ {gathering.gatheringEndDate}</span>
          <Image
            src="/assets/image/person.svg"
            alt="참여자 아이콘"
            width={18}
            height={18}
          />
          <span>{state.gatheringJoinedPeopleCount}/{state.gatheringMaxPeopleCount}</span>
          <OpenStatus gatheringJoinedPeopleCount={state.gatheringJoinedPeopleCount} />
        </div>
        <Button
          name={gathering.captainStatus ? "모임 취소하기" : "참여 취소하기"}
          style={gathering.captainStatus ? "default" : "cancel"}
          className={gathering.captainStatus
            ? "w-[163px] h-[43px] "
            : "w-[163px] h-[43px] text-primary"}
          handleButtonClick={() => onCancelReservation(gathering.gatheringId)}
        />
      </div>
    </div>
  );
}