import { GatheringItem } from '@/types';

interface GatheringTabProps {
  gatherings?: GatheringItem[];
  onGatheringClick: (gatheringId: number) => void;
  onCancelReservation: (gatheringId: number) => void;
}

export default function GatheringTab({ 
  gatherings = [],
  onGatheringClick, 
  onCancelReservation 
}: GatheringTabProps) {
  return (
    <div className="space-y-4">
      {(gatherings || [])
      // 모임 시작 날짜를 기준으로 정렬 (오름차순)
        .sort((a, b) => new Date(a.gatheringStartDate).getTime() - new Date(b.gatheringStartDate).getTime())
        .map(gathering => (
          <div 
            key={gathering.gatheringId} 
            className="p-4 bg-white rounded-lg flex justify-between items-center cursor-pointer"
            onClick={() => onGatheringClick(gathering.gatheringId)}
          >
            <div>
              <h3 className="font-medium">{gathering.gatheringTitle}</h3>
              <p className="text-dark-600">{`${gathering.gatheringMainType} > ${gathering.gatheringSubType}`}</p>
            </div>
            {gathering.isReservationCancellable && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onCancelReservation(gathering.gatheringId);
                }}
                className="px-3 py-1 text-primary border border-primary rounded"
              >
                예약 취소
              </button>
            )}
          </div>
      ))}
    </div>
  );
}