import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TagList from './\bcomponents/tag';

export default function GatheringDetail() {
  const router = useRouter();
  const gatheringId = router.query.gatheringId;
  const gathering = {
    gatheringTitle: '모임 제목',
    gatheringDescription:
      '디스크립션은50자까지 올수있습니답둘셋넷 디스크립션은50자까지 올수있습니답둘셋넷 ',
    ownerStatus: true, // 이 사용자가 모임장인지 아닌지
    gatheringImage: 'www.www.ww.w.w.w.w',
    gatheringMainType: '유산소형',
    gatheringSubType: '런닝',
    gatheringTags: ['심심할 때', '스트레스', '런닝 최고'],
    gatheringStartDate: '2022-22-22',
    gatheringEndDate: '2022-23-23',
    gatheringSi: '대전',
    gatheringGu: '서구',
    gatheringJoinedFivePeopleImages: [
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
    ],
    gatheringAverageRating: 4.5,
    gatheringGuestbookCount: 333,
    gatheringMaxPeopleCount: 10,
    gatheringMinPeopleCount: 3,
    gatheringJoinedPeopleCount: 5,
    gatheringStatus: '진행중',
    inProgressChallenges: [
      {
        // 진행중인 챌린지
        challengeId: 33,
        challengeImage: 'www.www.ww.w.w.w.w',
        challengeTitle: '',
        challengeDescription: '',
        challengeJoinedPeopleCount: 10,
        challengeSuccessPeopleCount: 5,
        challengeParticipationStatus: false, // 이 사용자가 참여중인지?
        challengeVerificationStatus: true, // 이 사용자가 인증을 완료했는지?
      },
      {
        challengeId: 33,
        challengeImage: 'www.www.ww.w.w.w.w',
        challengeTitle: '',
        challengeDescription: '',
        challengeJoinedPeopleCount: 10,
        challengeSuccessPeopleCount: 5,
        challengeParticipationStatus: false,
        challengeVerificationStatus: true,
      },
    ],
    doneChallenges: [
      {
        // 완료된 챌린지
        challengeId: 33,
        challengeImage: 'www.www.ww.w.w.w.w',
        challengeTitle: '',
        challengeDescription: '',
        challengeJoinedPeopleCount: 10,
        challengeSuccessPeopleCount: 5,
        challengeParticipationStatus: false, // 이 사용자가 참여했었인지?
        challengeVerificationStatus: true, // 이 사용자가 인증을 완료했었는지?
      },
      {
        challengeId: 33,
        challengeImage: 'www.ww.ww.w.w.w.w',
        challengeTitle: '',
        challengeDescription: '',
        challengeJoinedPeopleCount: 10,
        challengeSuccessPeopleCount: 5,
        challengeParticipationStatus: false,
        challengeVerificationStatus: true,
      },
    ],
  };

  useEffect(() => {
    console.log(gatheringId);
  }, []);

  return (
    <div className="w-[1200px] flex place-self-center">
      <div id="gathering-information" className="w-full">
        <div id="type-information">
          <div className="flex mt-20 gap-[10px]">
            <p>{gathering.gatheringMainType}</p>
            <Image
              src="/assets/image/arrow-right.svg"
              alt="arrow"
              width={12}
              height={12}
            />
            <p className="text-primary">{gathering.gatheringSubType}</p>
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
              {gathering.gatheringTitle}
            </h3>
            <p className="text-[1.125rem] text-dark-700 mt-4">
              {gathering.gatheringDescription}
            </p>
            <div id="tags" className="mt-5">
              <TagList tagList={gathering.gatheringTags} />
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
                <p>{`${gathering.gatheringStartDate}~${gathering.gatheringEndDate}`}</p>
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
                <p>{`${gathering.gatheringSi} ${gathering.gatheringGu}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="challenge-and-guestbook"></div>
    </div>
  );
}
