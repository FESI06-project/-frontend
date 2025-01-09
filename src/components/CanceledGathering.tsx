import Image from 'next/image';

interface CanceledGatheringOverlayProps {
  type: 'gathering' | 'challenge'; // 추가: 어떤 종류의 취소인지 구분 취소 구분 조건은 지금 안달려 있습니다.
  gatheringStartDate?: string; // 모임 관련 정보는 선택적
  gatheringJoinedPeopleCount?: number; // 모임 관련 정보는 선택적
  isReservationCancellable?: boolean; // 모임 관련 정보는 선택적
  onOverlay?: () => void;//바로 토글닫치는지지
  className?: string;
}
export default function CanceledOverlay({
  type,
  gatheringStartDate,
  gatheringJoinedPeopleCount,
  isReservationCancellable,
  className = ''
}: CanceledGatheringOverlayProps) {

  const checkCancellationReason = () => {
    if (type === 'challenge') {
      return "챌린지가 취소되었습니다.";
    }

    if (type === 'gathering') {
      if (!gatheringStartDate || gatheringJoinedPeopleCount === undefined || isReservationCancellable === undefined) {
        throw new Error('Gathering props are required for gathering type.');
      }

      const currentDate = new Date();
      const startDate = new Date(gatheringStartDate);
      const isExpired = startDate < currentDate;
      const isNotConfirmed = gatheringJoinedPeopleCount < 5;

      // 모임장이 취소한 경우
      if (isReservationCancellable) {
        return "모집 취소된 모임이예요.";
      }
      // 시작일이 지났고 5명 미만인 경우
      else if (isExpired && isNotConfirmed) {
        return "모집 미달로 취소된 모임이예요.";
      }
    }

    return null;
  };

  const cancellationReason = checkCancellationReason();
  if (!cancellationReason) return null;

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center
       rounded-[10px] bg-black/80 backdrop-blur-[2px] ${className}`}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/assets/image/cancel.svg"
          alt="취소"
          width={32}
          height={32}
          className="mb-[15px]"
        />
        <div className="flex flex-col items-center leading-[150%]">
          <p className="text-lg font-semibold">
            {cancellationReason}
          </p>
          <p className="text-lg font-semibold">
            다음 기회에 만나요!
          </p>
        </div>
      </div>
    </div>
  );
}
