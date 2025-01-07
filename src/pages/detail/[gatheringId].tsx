import Image from 'next/image';
import { useRouter } from 'next/router';

export default function GatheringDetail() {
  const router = useRouter();
  const gatheringId = router.query.gatheringId;
  const gathering = {
    gatheringTitle: '모임 제목',
    gatheringDescription: '모임 설명',
    ownerStatus: true, // 이 사용자가 모임장인지 아닌지
    gatheringImage: 'www.www.ww.w.w.w.w',
    gatheringMainType: '유산소형',
    gatheringSubType: '런닝',
    gatheringTags: ['심심할 때', '스트레스 풀면서 달리기', '런닝 최고'],
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
  return (
    <div className="bg-dark-100 w-[1200px] flex place-self-center">
      <div id="gathering-information" className="">
        <div id="type-information">
          <div className="flex mt-20 gap-[10px]">
            <p className="text-white">{gathering.gatheringMainType}</p>
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
            className="rounded-[20px] mr-[50px]"
          />
          <div id="detail-information">
            <h1>{gathering.gatheringTitle}</h1>
            <p>{gathering.gatheringDescription}</p>
            <div id="tags">
              {gathering.gatheringTags.map((tag) => (
                <span key={tag}>{`#${tag} `}</span>
              ))}
            </div>
            <div id="range-and-place">
              <div id="range">{`${gathering.gatheringStartDate}~${gathering.gatheringEndDate}`}</div>
              <div id="place">{`${gathering.gatheringSi} ${gathering.gatheringGu}`}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="challenge-and-guestbook"></div>
    </div>
  );
}
