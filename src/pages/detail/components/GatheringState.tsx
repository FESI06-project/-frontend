import BarChart from '@/components/chart/BarChart';
import Heart from '@/components/common/Heart';
import OpenStatus from '@/components/tag/OpenStatus';
import { GatheringStateType } from '@/types';
import Image from 'next/image';

export default function GatheringState({
  state,
}: {
  state: GatheringStateType;
}) {
  if (!state) {
    return <div>{'Loading..'}</div>;
  }

  return (
    <div className="flex items-center w-[1200px] mt-[25px]">
      <div id="rating" className="font-bold mr-[174px]">
        <h3 className="mb-[18px] font-bold">{'모임 만족도'}</h3>
        <div className="flex">
          <Heart rating={state.gatheringAverageRating} />
          <span className="ml-[10px]">{`${state.gatheringAverageRating} / 5.0`}</span>
        </div>
        <div className="text-sm mt-[18px]">{`총 ${state.gatheringGuestbookCount}개의 방명록`}</div>
      </div>
      <div className="gap-[15px]">
        <div className="flex justify-between items-center">
          <div id="joined-people" className="w-[388px] flex items-center">
            {/* 참가자 5인 프로필 이미지 */}
            <div className="flex -space-x-[10px]">
              {state.gatheringJoinedFivePeopleImages?.map((image, index) => (
                <Image
                  key={index}
                  src="/assets/image/fitmon.png"
                  width={29}
                  height={29}
                  alt="profile"
                  className="rounded-full"
                />
              ))}

              {/* 추가 인원 */}
              {state.gatheringJoinedPeopleCount >= 5 && (
                <div className="w-[29px] h-[29px] text-center content-center bg-white text-black text-sm font-extrabold rounded-full">
                  +{state.gatheringJoinedPeopleCount - 5}
                </div>
              )}
            </div>

            {/* 참가자 수 안내 */}
            <div className="flex justify-center items-center ml-3">
              <p className="text-primary text-sm font-semibold">
                {`${state.gatheringJoinedPeopleCount}명`}
              </p>
              <p className="text-sm font-semibold">{'이 참가하고 있어요'}</p>
            </div>
          </div>

          {/* 개설 상태 안내 */}
          <OpenStatus
            className="h-5"
            gatheringJoinedPeopleCount={state.gatheringJoinedPeopleCount}
          />
        </div>

        {/* 참가자 상태 바 */}
        <div className="my-[15px]">
          <BarChart
            total={state.gatheringMaxPeopleCount}
            value={state.gatheringJoinedPeopleCount}
          />
        </div>

        <div className="flex justify-between">
          <p className="text-sm text-dark-700 mt-[15px]">{`최소 ${state.gatheringMinPeopleCount}명`}</p>
          <p className="text-sm text-dark-700 mt-[15px]">{`최대 ${state.gatheringMaxPeopleCount}명`}</p>
        </div>
      </div>
      <div id="buttons"></div>
    </div>
  );
}
