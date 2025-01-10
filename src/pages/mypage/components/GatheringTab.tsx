import MainCard from './MainCard';
import ChallengeSection from './ChallengeSection';
import CanceledGathering from '@/components/common/CanceledGathering';
import { GatheringChallengeType, GatheringItem, GatheringStateType } from '@/types';
import { useState } from 'react';

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
  onCancelReservation,
}: GatheringTabProps) {
  const [openChallenges, setOpenChallenges] = useState<{ [key: number]: boolean }>({});

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
        .map((gathering) => {
          // gathering이 유효하지 않은 경우 무시
          if (!gathering) return null;

          const state = gatheringStates[gathering.gatheringId];
          if (!state) return null;

          const challenges = gatheringChallenges[gathering.gatheringId];
          const isOpen = openChallenges[gathering.gatheringId];

          return (
            <div key={gathering.gatheringId} className="relative rounded-lg overflow-hidden mb-[50px]">
              <MainCard 
                gathering={gathering}
                state={state}
                onCancelReservation={onCancelReservation}
              />
              
              <ChallengeSection
                challenges={challenges}
                gathering={gathering}
                isOpen={isOpen}
                onToggle={() => handleToggleChallenge(gathering.gatheringId)}
              />

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
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  이 모임에서 참여했던 챌린지
                </span>
              </div>

              {/* 챌린지 그리드 (토글되었을 때 표시) */}
              {challenges && challenges?.inProgressChallenges && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-[#2C2C2C]">
                  {challenges.inProgressChallenges.map((challenge) => (
                    <div
                      key={challenge.challengeId}
                      className="bg-[#363636] p-3 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={challenge.imageUrl}
                            alt={challenge.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white text-sm">
                            {challenge.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {gathering.gatheringStartDate} ~{' '}
                            {gathering.gatheringEndDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}