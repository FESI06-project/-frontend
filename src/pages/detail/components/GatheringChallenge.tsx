import SubTag from '@/components/tag/SubTag';
import { GatheringChallengeType } from '@/types';
import { useState } from 'react';

export default function GatheringChallenge({
  challenge,
}: {
  challenge: GatheringChallengeType;
}) {
  const challengeSubTagItems = [
    { id: 'inProgress', label: '진행중인 챌린지' },
    { id: 'done', label: '마감된 챌린지' },
  ];
  const [currentTag, setCurrentTag] = useState('inProgress');

  return (
    <div>
      <SubTag
        tags={challengeSubTagItems}
        currentTag={currentTag}
        onTagChange={(newTag) => setCurrentTag(newTag)}
        className="mt-[40px]"
      />
      <p>{challenge ? 'df' : 'ss'}</p>
    </div>
  );
}
