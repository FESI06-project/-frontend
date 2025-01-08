import { GatheringStateType } from '@/types';
import Heart from './Heart';

export default function GatheringState({
  state,
}: {
  state: GatheringStateType;
}) {
  if (!state) {
    return <div>{'Loading..'}</div>;
  }
  return (
    <div className="flex">
      <div id="rating" className="mr-[174px] mt-[25px] font-bold">
        <h3>{'모임 만족도'}</h3>
        <span>
          <Heart rating={state.gatheringAverageRating} />
          {`${state.gatheringAverageRating} / 5.0`}
        </span>
        <div className="text-sm">{`총 ${state.gatheringGuestbookCount}개의 방명록`}</div>
      </div>
      <div id="joined-people">
        <div className="flex">
          {state.gatheringJoinedFivePeopleImages?.map((image, index) => (
            <p key={index}>{image}</p>
          ))}
        </div>
      </div>
      <div id="buttons"></div>
    </div>
  );
}
