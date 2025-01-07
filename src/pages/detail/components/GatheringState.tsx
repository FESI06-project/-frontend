import { GatheringStateType } from '@/types';

export default function GatheringState({
  state,
}: {
  state: GatheringStateType;
}) {
  if (!state) {
    return <div>{'Loading..'}</div>;
  }
  return <div>{state.gatheringAverageRating}</div>;
}
