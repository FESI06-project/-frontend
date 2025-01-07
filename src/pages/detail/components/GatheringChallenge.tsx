import { GatheringChallengeType } from '@/types';

export default function GatheringChallenge({
  challenge,
}: {
  challenge: GatheringChallengeType;
}) {
  return <div>{challenge ? 'df' : 'ss'}</div>;
}
