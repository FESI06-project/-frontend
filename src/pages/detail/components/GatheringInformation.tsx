import Image from 'next/image';
import TagList from './tag';
import { GatheringItem } from '@/types';

export default function GatheringInformation({
  information,
}: {
  information: GatheringItem;
}) {
  return (
    <div id="gathering-information" className="w-full">
      <div id="type-information">
        <div className="flex mt-20 gap-[10px]">
          <p>{information.gatheringMainType}</p>
          <Image
            src="/assets/image/arrow-right.svg"
            alt="arrow"
            width={12}
            height={12}
          />
          <p className="text-primary">{information.gatheringSubType}</p>
        </div>
      </div>
      <div id="image-and-description" className="flex mt-[30px]">
        <Image
          width={280}
          height={300}
          alt="gathering-image"
          src="/assets/image/fitmon.png"
          className="rounded-[20px] mr-[50px] w-[280px] h-[300px] object-cover"
        />
        <div id="detail-information" className=" w-full">
          <h3 className="text-[1.75rem] font-semibold">
            {information.gatheringTitle}
          </h3>
          <p className="text-[1.125rem] text-dark-700 mt-4">
            {information.gatheringDescription}
          </p>
          <div id="tags" className="mt-5">
            <TagList tagList={information.gatheringTags} />
          </div>
          <div
            id="range-and-place"
            className="w-full mt-[25px] py-[30px] bg-dark-200 rounded-[20px]"
          >
            <div id="range" className="flex items-center mb-[13px]">
              <Image
                src="/assets/image/time.svg"
                width={14}
                height={14}
                alt="time"
                className="ml-[25px] mr-2"
              />
              <h1 className="font-semibold">{'모임 기간'}</h1>
              <p className="bg-dark-500 h-[12px] w-[1px] mx-[15px]"></p>{' '}
              <p>{`${information.gatheringStartDate}~${information.gatheringEndDate}`}</p>
            </div>
            <div id="place" className="flex items-center">
              <Image
                src="/assets/image/place.svg"
                width={14}
                height={14}
                alt="place"
                className="ml-[25px] mr-2"
              />
              <h1 className="font-semibold">{'모임 장소'}</h1>
              <p className="bg-dark-500 h-[12px] w-[1px] mx-[15px]"></p>
              <p>{`${information.gatheringSi} ${information.gatheringGu}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
