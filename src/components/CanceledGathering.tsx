import Image from 'next/image';

interface CanceledGatheringOverlayProps {
  gatheringStartDate: string;
  gatheringJoinedPeopleCount: number;
  isReservationCancellable: boolean;
  className?: string;
}

export default function CanceledGathering({
  gatheringStartDate,
  gatheringJoinedPeopleCount,
  isReservationCancellable,
  className = ''
}: CanceledGatheringOverlayProps) {
  const checkCancellationReason = () => {
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