import { MainChallenge } from '@/types';
import Link from 'next/link';

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

  const date = `${startDate} ~ ${endDate}`;

  return (
    <Link href={`/detail/${gatheringId}`}>
      <div>{date}</div>
    </Link>
  );
}
