import BarChart from '@/components/chart/BarChart';
import Button from '@/components/common/Button';
import SubTag from '@/components/tag/SubTag';
import { GatheringChallengeType } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

export default function GatheringChallenge({
  challenge,
}: {
  challenge: GatheringChallengeType;
}) {
  const challengeSubTagItems = [
    { id: 'inProgress', label: '진행중인 챌린지' },
    { id: 'done', label: '마감된 챌린지' },
  ];
  const [currentTag, setCurrentTag] = useState('inProgress');
  const c = {
    gatheringId: 0,
    challengeId: 0,
    title: 'string',
    description: 'string',
    imageUrl: 'string',
    participantCount: 10,
    successParticipantCount: 3,
    participantStatus: true,
    verificationStatus: true,
    startDate: '2025-01-09T08:12:48.388Z',
    endDate: '2025-01-09T08:12:48.388Z',
  };

  return (
    <div>
      <div className="mt-[43px] ">
        <SubTag
          tags={challengeSubTagItems}
          currentTag={currentTag}
          onTagChange={(newTag) => setCurrentTag(newTag)}
          className="absolute"
        />
        <div className="relative flex justify-between ">
          <div />
          <div className="flex">
            <div className="flex items-center justify-center mr-[17px]">
              <Image
                src="/assets/image/list-ul.svg"
                alt="list-ul"
                width={16}
                height={16}
                className="mr-[10px]"
              />
              <p className="text-sm">{'리스트 보기'}</p>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/image/calendar.svg"
                alt="list-ul"
                width={14}
                height={14}
                className="mr-[10px]"
              />
              <p className="text-sm">{'달력 보기'}</p>
            </div>
          </div>
        </div>
      </div>

      <p>{challenge ? 'df' : 'ss'}</p>
      <Challenge challenge={c} />
    </div>
  );
}

function Challenge({ challenge }: { challenge: ChallengeProps }) {
  return (
    <div className="w-full h-[250px]  bg-dark-200 rounded-[20px]">
      <div className="flex">
        {/* 좌측 사진 */}
        <Image
          className="rounded-bl-[20px] rounded-tl-[20px]"
          src="/assets/image/fitmon.png"
          alt="alt"
          width={250}
          height={250}
        />
        {/* 우측 설명 */}
        <div className="w-full ml-[50px] mr-[30px]">
          <div className="flex flex-col mt-[30px] mb-[20px] gap-[10px]">
            <div className="flex justify-between">
              <p className="text-sm text-dark-700">
                {`${challenge.startDate.substring(0, 10)} ~ ${challenge.endDate.substring(0, 10)}`}
              </p>
              <Image
                src="/assets/image/three-dots.svg"
                alt="dots"
                width={20}
                height={21}
              />
            </div>
            <p className="text-2xl font-semibold">{challenge.title}</p>
            <p className="text-dark-700 h-[50px]">{challenge.description}</p>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-[608px]">
              <div className="flex justify-between">
                {/* 좌측 인원 수 정보 */}
                <div className="flex items-center justify-center gap-[6px] mb-[15px]">
                  <Image
                    src="/assets/image/person.svg"
                    alt="참여자 아이콘"
                    width={28}
                    height={28}
                  />
                  <p>{`${challenge.successParticipantCount}/${challenge.participantCount}`}</p>
                </div>
                {/* 우측 퍼센트 */}
                <p className="text-2xl text-primary font-bold">
                  {(challenge.successParticipantCount /
                    challenge.participantCount) *
                    100}
                  %
                </p>
              </div>
              <BarChart
                total={challenge.participantCount}
                value={challenge.successParticipantCount}
              />
            </div>
            <Button
              style="custom"
              name="인증하기"
              className="w-40 h-10 font-semibold text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChallengeProps {
  gatheringId: number;
  challengeId: number;
  title: string;
  description: string;
  imageUrl: string;
  participantCount: number;
  successParticipantCount: number;
  participantStatus: boolean;
  verificationStatus: boolean;
  startDate: string;
  endDate: string;
}
