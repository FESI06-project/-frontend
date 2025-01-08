import BarChart from '@/components/BarChart';
import Heart from '@/components/Heart';
import RingChart from '@/components/RingChart';
import { GatheringStateType } from '@/types';

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
        <h3 className="mb-[18px]">{'모임 만족도'}</h3>
        <div className="flex">
          <Heart rating={state.gatheringAverageRating} />
          <span className="ml-[10px]">{`${state.gatheringAverageRating} / 5.0`}</span>
        </div>
        <div className="text-sm mt-[18px]">{`총 ${state.gatheringGuestbookCount}개의 방명록`}</div>
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
