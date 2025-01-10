import BarChart from '@/components/chart/BarChart';
import Button from '@/components/common/Button';
import SubTag from '@/components/tag/SubTag';
import { GatheringChallegeProps, GatheringChallengeType } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

export default function GatheringChallenge({
  challenges,
  captainStatus,
}: GatheringChallegeProps) {
  const challengeSubTagItems = [
    { id: 'inProgress', label: '진행중인 챌린지' },
    { id: 'done', label: '마감된 챌린지' },
  ];
  const [currentTag, setCurrentTag] = useState('inProgress');
  const [currentInquiryState, setCurrentInquiryState] = useState('list');

  return (
    <div>
      <div className="mt-[43px] ">
        <div className="flex items-center justify-between">
          <SubTag
            tags={challengeSubTagItems}
            currentTag={currentTag}
            onTagChange={(newTag) => setCurrentTag(newTag)}
          />

          <div className="flex">
            <div
              onClick={() => setCurrentInquiryState('list')}
              className="flex items-center justify-center mr-[17px]"
              style={{
                color: currentInquiryState === 'list' ? '#FF2140' : 'white',
              }}
            >
              <Image
                src={
                  currentInquiryState === 'list'
                    ? '/assets/image/list-ul-primary.svg'
                    : '/assets/image/list-ul.svg'
                }
                alt="list-ul"
                width={16}
                height={16}
                className="mr-[10px]"
              />

              <p className="text-sm">{'리스트 보기'}</p>
            </div>
            <div
              onClick={() => setCurrentInquiryState('calendar')}
              className="flex items-center justify-center"
              style={{
                color: currentInquiryState === 'calendar' ? '#FF2140' : 'white',
              }}
            >
              <Image
                src={
                  currentInquiryState === 'calendar'
                    ? '/assets/image/calendar-primary.svg'
                    : '/assets/image/calendar.svg'
                }
                alt="list-ul"
                width={14}
                height={14}
                className="mr-[10px]"
              />
              <p className="text-sm">{'달력 보기'}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-[31px] gap-6">
          {currentTag === 'inProgress' &&
            currentInquiryState === 'list' &&
            challenges.inProgressChallenges.map((challenge, index) => (
              <Challenge
                key={index}
                challenge={{ ...challenge, captainStatus }}
              />
            ))}
          {currentTag === 'done' &&
            currentInquiryState === 'list' &&
            challenges.doneChallenges.map((challenge, index) => (
              <Challenge
                key={index}
                challenge={{ ...challenge, captainStatus }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function Challenge({ challenge }: { challenge: ChallengeProps }) {
  const button = () => {
    if (!challenge.participantStatus) {
      return (
        <Button
          style="custom"
          name="참여하기"
          className="w-40 h-10 font-semibold text-base"
        />
      );
    }

    if (!challenge.verificationStatus) {
      return (
        <Button
          style="custom"
          name="인증하기"
          className="w-40 h-10 font-semibold text-base"
        />
      );
    }

    return (
      <Button
        style="disabled"
        name="인증완료"
        className="bg-dark-700 w-40 h-10 font-semibold text-base "
      />
    );
  };

  return (
    <div className="w-full h-[250px] bg-dark-200 rounded-[10px]">
      <div className="flex">
        {/* 좌측 사진 */}
        <Image
          className="rounded-bl-[10px] rounded-tl-[10px]"
          src="/assets/image/fitmon.png"
          alt="alt"
          width={250}
          height={250}
        />
        {/* 우측 설명 */}
        <div className="w-full ml-[50px] mr-[30px]">
          <div className="flex flex-col mt-[30px] mb-[20px] gap-[10px]">
            <div className="flex justify-between">
              {/* 날짜 */}
              <p className="text-sm text-dark-700">
                {`${challenge.startDate.substring(0, 10)} ~ ${challenge.endDate.substring(0, 10)}`}
              </p>
              {/* 모임장만 보이는 설정 버튼 */}
              {challenge.captainStatus && (
                <Image
                  src="/assets/image/three-dots.svg"
                  alt="dots"
                  width={20}
                  height={21}
                />
              )}
            </div>
            {/* 제목, 설명 */}
            <p className="text-2xl font-semibold">{challenge.title}</p>
            <p className="text-dark-700 h-[50px]">{challenge.description}</p>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-[608px]">
              <div className="flex justify-between">
                {/* 인원 수 정보 */}
                <div className="flex items-center justify-center gap-[6px] mb-[15px]">
                  <Image
                    src="/assets/image/person.svg"
                    alt="참여자 아이콘"
                    width={28}
                    height={28}
                  />
                  <p>{`${challenge.successParticipantCount}/${challenge.participantCount}`}</p>
                </div>
                {/* 퍼센트 */}
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
            {/* 참여했다면 인증하기 버튼, 참여하지 않았다면 참여하기 버튼 */}
            {button()}
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
  captainStatus: boolean;
}
