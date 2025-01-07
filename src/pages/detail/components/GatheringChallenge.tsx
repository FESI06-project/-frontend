import { GatheringChallengeType } from '@/types';

export default function GatheringChallenge({
  challenge,
}: {
  challenge: GatheringChallengeType;
}) {
  return <div>{challenge.doneChallenges[0].challengeDescription}</div>;
}
