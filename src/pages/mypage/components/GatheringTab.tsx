import StatusTag from '@/components/StatusTag';
import OpenStatus from '@/components/OpenStatus';
import CanceledGathering from '@/components/CanceledGathering';
import { GatheringChallengeType, GatheringItem, GatheringStateType } from '@/types';
import Image from 'next/image';

interface GatheringTabProps {
  gatherings?: GatheringItem[];
  gatheringStates: { [key: number]: GatheringStateType };
  gatheringChallenges: { [key: number]: GatheringChallengeType };
  onGatheringClick: (gatheringId: number) => void;
  onCancelReservation: (gatheringId: number) => void;
}

export default function GatheringTab({
  gatherings = [],
  gatheringStates,
  gatheringChallenges,
  //onGatheringClick, 클릭 시 이동 프롭스
  onCancelReservation
}: GatheringTabProps) {
  return (
    <div className="space-y-6">
      {(gatherings || [])
        .sort((a, b) =>
          new Date(b.gatheringStartDate).getTime() - new Date(a.gatheringStartDate).getTime()
        )
        .map(gathering => {
          const state = gatheringStates[gathering.gatheringId];
          const challenges = gatheringChallenges[gathering.gatheringId];

        console.log('모임 ID:', gathering.gatheringId);
        console.log('챌린지 데이터:', challenges);
        console.log('챌린지 진행중:', challenges?.inProgressChallenges);

          return (
            <div key={gathering.gatheringId} className="relative rounded-lg overflow-hidden">
              {/* 메인 카드 영역 */}
              <div className="flex w-[906px] h-[200px] gap-[30px]">
                {/* 이미지 영역 */}
                <div className="relative w-[300px] h-[200px]">
                  <img
                    src={gathering.gatheringImage === "null" || !gathering.gatheringImage
                      ? '/assets/image/default_img.png'
                      : gathering.gatheringImage}
                    alt={gathering.gatheringTitle}
                    className="w-full h-full object-cover rounded-[20px]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/assets/image/default_img.png';
                    }}
                  />
                  {/* StatusTag 컴포넌트로 교체 */}
                  <div className="absolute bottom-7 left-5">
                    <StatusTag status={gathering.gatheringStatus} />
                  </div>
                </div>

                {/* 정보 영역 */}
                <div className="flex flex-col flex-1 py-[19px]">
                  <span className="text-primary font-normal mb-3.5">{gathering.gatheringSubType} | {gathering.gatheringSi} {gathering.gatheringGu} </span>
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

                  {/* 예약 취소 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancelReservation(gathering.gatheringId);
                    }}
                    className="h-[43px] w-[163px] rounded-[10px] border border-primary text-primary font-semibold"
                  >
                    참여 취소하기
                  </button>
                </div>
              </div>

              {/* 챌린지 영역 토글 버튼 */}
              <div
                className="px-4 py-2 border-t border-gray-700 text-white cursor-pointer hover:bg-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  // 챌린지 토글 로직
                }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  이 모임에서 참여했던 챌린지
                </span>
              </div>

              {/* 챌린지 그리드 (토글되었을 때 표시) */}
              {challenges && challenges.inProgressChallenges.length > 0 && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-[#2C2C2C]">
                  {challenges.inProgressChallenges.map(challenge => (
                    <div key={challenge.challengeId} className="bg-[#363636] p-3 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={challenge.challengeImage}
                            alt={challenge.challengeTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white text-sm">{challenge.challengeTitle}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {gathering.gatheringStartDate} ~ {gathering.gatheringEndDate}
                          </p>
                        </div>
                      </div>

                    </div>
                  ))}

                </div>
              )}
              {/* 취소 오버레이 */}
              <CanceledGathering
                gatheringStartDate={gathering.gatheringStartDate}
                gatheringJoinedPeopleCount={state.gatheringJoinedPeopleCount}
                isReservationCancellable={gathering.isReservationCancellable || false}
              />
            </div>
          );
        })}
    </div>
  );
}