import { GatheringStateType } from '@/types';

export default function GatheringState({
  state,
}: {
  state: GatheringStateType;
}) {
  return <div>{state.gatheringAverageRating}</div>;
}
