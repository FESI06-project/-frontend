import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  GatheringChallengeType,
  GatheringItem,
  GatheringStateType,
  GuestbookItem,
} from '@/types';
import GatheringInformation from './components/GatheringInformation';
import GatheringChallenge from './components/GatheringChallenge';
import GatheringGuestbook from './components/GatheringGuestbook';
import GatheringState from './components/GatheringState';
import Tab from '@/components/common/Tab';
import useModalStore from '@/stores/useModalStore';
import Modal from '@/components/dialog/Modal';

export default function GatheringDetail() {
  const router = useRouter();
  const gatheringId = router.query.gatheringId;
  const { showModal, setShowModal } = useModalStore();
  const gatheringTabItems = [
    {
      id: 'challenge',
      label: '챌린지',
    },
    {
      id: 'guestbook',
      label: '방명록',
    },
  ];
  const [currentTab, setCurrentTab] = useState('challenge');

  const gathering: GatheringItem = {
    gatheringId: 0,
    gatheringTitle: '모임 제목',
    gatheringDescription:
      '디스크립션은50자까지 올수있습니답둘셋넷 디스크립션은50자까지 올수있습니답둘셋넷 ',
    captainStatus: true, // 이 사용자가 모임장인지 아닌지
    gatheringImage: 'www.www.ww.w.w.w.w',
    gatheringMainType: '유산소형',
    gatheringSubType: '런닝',
    gatheringTags: ['심심할 때', '스트레스', '런닝 최고'],
    gatheringStartDate: '2022-22-22',
    gatheringEndDate: '2022-23-23',
    gatheringSi: '대전',
    gatheringGu: '서구',
    gatheringStatus: '모집중',
    isReservationCancellable: false,
  };

  const gatheringState: GatheringStateType = {
    gatheringJoinedFivePeopleImages: [
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
    ],
    gatheringAverageRating: 4.5,
    gatheringGuestbookCount: 333,
    gatheringMaxPeopleCount: 10,
    gatheringMinPeopleCount: 3,
    gatheringJoinedPeopleCount: 6,
    gatheringStatus: '진행중',
  };

  const gatheringChallenge: GatheringChallengeType = {
    inProgressChallenges: [
      {
        gatheringId: 0,
        challengeId: 0,
        title: 'string',
        description: 'string',
        imageUrl: 'string',
        participantCount: 10,
        successParticipantCount: 3,
        participantStatus: false,
        verificationStatus: true,
        startDate: '2025-01-09T08:12:48.388Z',
        endDate: '2025-01-09T08:12:48.388Z',
      },
      {
        gatheringId: 0,
        challengeId: 0,
        title: 'string',
        description: 'string',
        imageUrl: 'string',
        participantCount: 10,
        successParticipantCount: 3,
        participantStatus: true,
        verificationStatus: false,
        startDate: '2025-01-09T08:12:48.388Z',
        endDate: '2025-01-09T08:12:48.388Z',
      },
      {
        gatheringId: 0,
        challengeId: 0,
        title: 'string',
        description: 'string',
        imageUrl: 'string',
        participantCount: 10,
        successParticipantCount: 3,
        participantStatus: true,
        verificationStatus: false,
        startDate: '2025-01-09T08:12:48.388Z',
        endDate: '2025-01-09T08:12:48.388Z',
      },
    ],
    doneChallenges: [
      {
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
      },
      {
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
      },
    ],
  };

  const gatheringGuestbook: Array<GuestbookItem> = [
    {
      guestbookId: 1,
      gatheringId: 1,
      gatheringTitle: 'title1',
      content: 'good',
      rating: 4,
      createdAt: '2022-22-22',
    },
    {
      guestbookId: 2,
      gatheringId: 2,
      gatheringTitle: 'title2',
      content: 'hello',
      rating: 3,
      createdAt: '2022-22-22',
    },
  ];

  useEffect(() => {
    console.log(gatheringId);
  }, []);

  return (
    <div className="w-[1200px] flex flex-col place-self-center overflow-auto">
      <GatheringInformation information={gathering} />
      <GatheringState state={gatheringState} />
      <div className="flex mt-[50px] w-[1200px] ">
        <Tab
          items={gatheringTabItems}
          currentTab={currentTab}
          onTabChange={(newTab) => setCurrentTab(newTab)}
          className="w-[1200px] h-[31px] text-lg font-bold pb-[15px] "
        />
        {gathering.captainStatus && (
          <div className="w-full relative flex justify-between ">
            <div></div>
            <button
              onClick={() => setShowModal(!showModal)}
              className="text-lg"
            >
              {'+ 챌린지 추가하기'}
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <Modal title="모임 정보를 입력해주세요.">
          <div>
            <p>{'모임 정보'}</p>
          </div>
        </Modal>
      )}
      <GatheringChallenge
        challenges={gatheringChallenge}
        captainStatus={gathering.captainStatus ?? false}
      />
      <GatheringGuestbook guestbook={gatheringGuestbook} />
    </div>
  );
}
