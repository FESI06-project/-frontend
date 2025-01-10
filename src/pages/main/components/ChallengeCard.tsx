import { MainChallenge } from '@/types';
import Link from 'next/link';
import getDatePart from '@/utils/getDatePart';
import Image from 'next/image';

interface ChallengeCardProps {
  data: MainChallenge;
}

export default function ChallengeCard({ data }: ChallengeCardProps) {
  const {
    title,
    description,
    imageUrl,
    gatheringId,
    startDate,
    endDate,
    participantCount,
    successParticipantCount,
  } = data;

  const date = `${getDatePart(startDate)} ~ ${getDatePart(endDate)}`;

  return (
    <Link
      href={`/detail/${gatheringId}`}
      className="w-[320px] h-[320px] flex flex-col justify-between relative rounded-2xl overflow-hidden bg-dark-200 p-[30px]"
    >
      <div className="flex flex-col gap-2.5 relative z-10">
        <div className="text-sm text-dark-700">{date}</div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className=" text-dark-700">{description}</p>
      </div>
      <div className="flex justify-between relative z-10">
        <div className="flex items-center font-normal gap-2 text-white">
          <span className=" font-semibold">
            {participantCount} / {successParticipantCount}
          </span>
          <Image
            src="/assets/image/person.svg"
            alt="참여자 아이콘"
            width={22}
            height={22}
          />
        </div>
        <div className="font-semibold">챌린지 참여하기 →</div>
      </div>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="bg-cover blur-[2px] absolute left-0 top-0 w-full h-full opacity-20 z-0"
      ></div>
    </Link>
  );
}
