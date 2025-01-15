import { useState } from 'react';
import Image from 'next/image';
import StatusTag from '@/components/tag/StatusTag';
import OpenStatus from '@/components/tag/OpenStatus';
import Button from '@/components/common/Button';
import Alert from '@/components/dialog/Alert';
import { GatheringItem, GatheringStateType } from '@/types';
import useToastStore from '@/stores/useToastStore';

interface MainCardProps {
  gathering: GatheringItem;
  state: GatheringStateType;
  onCancelGathering?: (gatheringId: number) => void;  // 모임장용
  onCancelParticipation?: (gatheringId: number) => void;
}

export default function MainCard({ gathering, state, onCancelGathering, onCancelParticipation }: MainCardProps) {
  const [showAlert, setShowAlert] = useState(false);
  const showToast = useToastStore((state) => state.show);
  // gathering 객체가 유효한지 확인
  if (!gathering || !gathering.gatheringImage) {
    return null; // 또는 기본 UI 렌더링
  }
  const handleCancelClick = () => {
    setShowAlert(true);
  };


  const handleCancelConfirm = () => {
    if (gathering.captainStatus) {
      onCancelGathering?.(gathering.gatheringId);
    } else {
      onCancelParticipation?.(gathering.gatheringId);
    }
    setShowAlert(false);
    showToast('취소되었습니다.', 'check');
  };
  const handleCancelDeny = () => {
    setShowAlert(false);
    showToast('취소가 중단되었습니다.', 'caution');
  };

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
        <h3 className="text-primary font-normal mb-3.5">
          {gathering.gatheringSubType} | {gathering.gatheringSi} {gathering.gatheringGu}
        </h3>
        <h2 className="text-xl font-bold mb-3.5">{gathering.gatheringTitle}</h2>
        <div className="flex items-center gap-[13px] text-dark-700 mb-[21px]">
          <h4>{gathering.gatheringStartDate} ~ {gathering.gatheringEndDate}</h4>
          <div className="flex items-center font-normal gap-2 text-white">
            <Image
              src="/assets/image/person.svg"
              alt="참여자 아이콘"
              width={18}
              height={18}
            />
            <span>{state.gatheringJoinedPeopleCount}/{state.gatheringMaxPeopleCount}</span>
          </div>
          <OpenStatus gatheringJoinedPeopleCount={state.gatheringJoinedPeopleCount} />
        </div>
        <div className="w-[163px] h-[43px]">
          <Button
            name={gathering.captainStatus ? "모임 취소하기" : "참여 취소하기"}
            style={gathering.captainStatus ? "custom" : "cancel"}
            className={gathering.captainStatus
              ? "w-[163px] h-[43px] text-base"
              : "w-[163px] h-[43px] text-primary font-semibold"}
            handleButtonClick={handleCancelClick}
          />
        </div>
      </div>

      <Alert
        isOpen={showAlert}
        type="select"
        message={gathering.captainStatus
          ? "모임을 취소하시겠습니까? 모임을 취소하면 모집된 인원들도 취소됩니다."
          : "참여를 취소하시겠습니까?"}
        onConfirm={handleCancelConfirm}
        onCancel={handleCancelDeny}
      />

    </div>
  );
}