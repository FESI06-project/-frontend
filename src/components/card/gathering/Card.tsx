import StatusTag from '@/components/tag/StatusTag';
import { GatheringListItem } from '@/types';
import getDatePart from '@/utils/getDatePart';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  data: GatheringListItem;
}

export default function Card({ data }: CardProps) {
  console.log(data);

  const {
    gatheringId,
    title,
    imageUrl,
    subType,
    startDate,
    endDate,
    minCount,
    totalCount,
    participantCount,
    status,
    tags,
    mainLocation,
    subLocation,
  } = data;

  const date = `${getDatePart(startDate)} ~ ${getDatePart(endDate)}`;

  return (
    <Link href={`/detail/${gatheringId}`} className="flex gap-5">
      <div>
        <StatusTag status={status} />
        <Image
          src={imageUrl}
          width={220}
          height={220}
          alt="모임 사진"
          className="rounded-xl"
        />
      </div>
      <div>
        <span>
          {subType} | {mainLocation} {subLocation}
        </span>
        <h2>{title}</h2>
        <span>{date}</span>
        <div>
          {tags.map((tag) => {
            return <div key={tag}>{tag}</div>;
          })}
        </div>
        <div>
          {/* 임시 */}
          {minCount} {totalCount} {participantCount}
        </div>
      </div>
    </Link>
  );
}
