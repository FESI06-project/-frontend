import StatusTag from '@/components/StatusTag';
import OpenStatus from '@/components/OpenStatus';
import CanceledGathering from '@/components/CanceledGathering';
import { GatheringChallengeType, GatheringItem, GatheringStateType } from '@/types';
import { useState } from 'react';
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
  // 각 모임별 챌린지 토글 상태 관리
  const [openChallenges, setOpenChallenges] = useState<{ [key: number]: boolean }>({});

  // 챌린지 토글 핸들러
  const handleToggleChallenge = (gatheringId: number) => {
    setOpenChallenges(prev => ({
      ...prev,
      [gatheringId]: !prev[gatheringId]
    }));
  };

  return (
    <div className="space-y-6 pb-[50px]">
      {(gatherings || [])
        .sort((a, b) =>
          new Date(b.gatheringStartDate).getTime() - new Date(a.gatheringStartDate).getTime()
        )
        .map(gathering => {
          const state = gatheringStates[gathering.gatheringId];
          const challenges = gatheringChallenges[gathering.gatheringId];
          const isOpen = openChallenges[gathering.gatheringId];

          return (
            <div key={gathering.gatheringId} className="relative rounded-lg overflow-hidden mb-[50px]">
              {/* 메인 카드 영역 */}
              <div className="flex w-[906px] h-[200px] gap-[30px]">
                {/* 이미지 영역 */}
                <div className="relative w-[300px] h-[200px]">
                  <Image
                    src={gathering.gatheringImage === "null" || !gathering.gatheringImage
                      ? '/assets/image/default_img.png'
                      : gathering.gatheringImage}
                    alt={gathering.gatheringTitle}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-[20px]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/assets/image/default_img.png';
                    }}
                  />
                  {/* StatusTag 컴포넌트로 교체 */}
                  <div className="absolute bottom-4 left-5">
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
                className="mt-[30px] bg-dark-200 py-5 px-6 cursor-pointer rounded-[10px] "
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleChallenge(gathering.gatheringId);
                }}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Image
                    src="/assets/image/toggle.svg"
                    alt="토글"
                    width={16}
                    height={20}
                    className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  />
                  이 모임에서 참여했던 챌린지
                </span>
              </div>

              {/* 챌린지 그리드 (토글 상태에 따라 표시) */}
              {isOpen && challenges && challenges.inProgressChallenges.length > 0 && (
                <div className="grid grid-cols-3 gap-[10px] px-8 py-[30px] max-h-[403px] overflow-y-auto bg-dark-200">
                  {challenges.inProgressChallenges.map(challenge => (
                    <div key={challenge.challengeId} className="bg-dark-300 px-[28px] py-[25px] rounded-lg ">
                      <div className="flex items-start gap-[17px]">
                        <div className="relative w-[61px] h-[61px] rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              challenge.challengeImage === "null" || !challenge.challengeImage
                                ? '/assets/image/default_challenge.png'
                                : challenge.challengeImage
                            }
                            alt={challenge.challengeTitle}
                            width={61}
                            height={61}
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = '/assets/image/default_challenge.png';
                            }}
                          />
                        </div>
                        {/* 챌린지 상태 및 참여 정보 */}
                        <div className="flex-1">
                          <div className="flex items-center gap-[13px] mb-1">
                            <span
                              className={`text-sm font-semibold w-[84px] text-center px-[12px] py-[7px] rounded-full ${challenge.challengeVerificationStatus && challenge.challengeParticipationStatus
                                ? 'bg-dark-500'
                                : 'bg-primary'
                                }`}
                            >
                              {challenge.challengeVerificationStatus && challenge.challengeParticipationStatus
                                ? '참여완료'
                                : '참여중'}
                            </span>
                            <div className="flex items-center font-normal gap-2">
                              <Image
                                src="/assets/image/person.svg"
                                alt="참여자 아이콘"
                                width={20}
                                height={20}
                              />
                              <span className="text-dark-700 ">
                                {challenge.challengeSuccessPeopleCount}/{challenge.challengeJoinedPeopleCount}
                              </span>
                            </div>
                          </div>

                          {/* 챌린지 제목 및 기간 */}
                          <div className="w-full min-w-0 h-[60px]">  {/* min-w-0 추가로 flex 내부에서 텍스트 줄바꿈 허용 */}
                            <p className="font-semibold break-words">  {/* truncate 제거하고 break-words 추가 */}
                              {challenge.challengeTitle}
                            </p>
                            <p className="text-dark-700 text-sm font-normal">
                              {gathering.gatheringStartDate} ~ {gathering.gatheringEndDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* 취소 오버레이-> 오버레이 될경우 토글은 저절로 닫히게 구현되어야됌됌 */}
              <CanceledGathering
                type="gathering"
                gatheringStartDate={gathering.gatheringStartDate}
                gatheringJoinedPeopleCount={state.gatheringJoinedPeopleCount}
                isReservationCancellable={gathering.isReservationCancellable || false}
                onOverlay={() => {
                  setOpenChallenges(prev => ({
                    ...prev,
                    [gathering.gatheringId]: false
                  }));
                }}
              />
            </div>
          );
        })}
    </div>
  );
}