// MyGatheringTab.tsx
import MainCard from './MainCard';
import ChallengeSection from './ChallengeSection';
import CanceledGathering from '@/components/common/CanceledGathering';
import Null from '@/components/common/Null';
import { GatheringChallengeType, GatheringItem, GatheringStateType } from '@/types';
import { useState } from 'react';

interface MyGatheringTabProps {
  gatherings?: GatheringItem[];
  gatheringStates: { [key: number]: GatheringStateType };
  gatheringChallenges: { [key: number]: GatheringChallengeType };
  onGatheringClick: (gatheringId: number) => void;
  onCancelReservation: (gatheringId: number) => void;
}

export default function MyGatheringTab({
  gatherings = [],
  gatheringStates,
  gatheringChallenges,
  onCancelReservation,
}: MyGatheringTabProps) {
  const [openChallenges, setOpenChallenges] = useState<{ [key: number]: boolean }>({});

  const handleToggleChallenge = (gatheringId: number) => {
    setOpenChallenges(prev => ({
      ...prev,
      [gatheringId]: !prev[gatheringId]
    }));
  };
  const validGatherings = (gatherings || []).filter(gathering => {
    const state = gatheringStates[gathering?.gatheringId];
    return gathering && state;
  });

  if (validGatherings.length === 0) {
    return <Null message="아직 참여한 모임이 없습니다." />;
  }
  
  return (
    <div className="space-y-6 pb-[50px]">
      {(gatherings || [])
        .sort((a, b) =>
          new Date(b.gatheringStartDate).getTime() - new Date(a.gatheringStartDate).getTime()
        )
        .map((gathering) => {
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
              />
            </div>
          );
        })}
    </div>
  );
}