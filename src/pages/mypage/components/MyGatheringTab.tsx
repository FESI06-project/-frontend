interface MyGatheringItem {
    gatheringId: number;
    gatheringTitle: string;
    gatheringStatus: string;
    memberCount: number;
    challengeCount: number;
  }
  
  interface MyGatheringTabProps {
    myGatherings?: MyGatheringItem[]; 
  }
  
  export default function MyGatheringTab({
    myGatherings = [],  // 기본값 추가
  }: MyGatheringTabProps) {
    return (
      <div className="space-y-4">
        {(myGatherings || []).map(gathering => (
          <div 
            key={gathering.gatheringId}
            className="p-4 bg-white rounded-lg cursor-pointer"
          >
            <h3 className="font-medium">{gathering.gatheringTitle}</h3>
            <div className="mt-2 flex gap-4 text-sm text-dark-600">
              <span>상태: {gathering.gatheringStatus}</span>
              <span>참여자: {gathering.memberCount}명</span>
              <span>챌린지: {gathering.challengeCount}개</span>
            </div>
          </div>
        ))}
      </div>
    );
  }