import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  GatheringChallengeType,
  // GatheringItem,
  GatheringStateType,
  GuestbookItem,
} from '@/types';
import GatheringInformation from './components/GatheringInformation';
import GatheringChallenge from './components/GatheringChallenge';
import GatheringGuestbook from './components/GatheringGuestbook';
import GatheringState from './components/GatheringState';
import Tab from '@/components/common/Tab';
import Modal from '@/components/dialog/Modal';
import ChallengeAddModal from './components/ChallengeAddModal';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import apiRequest from '@/utils/apiRequest';
// import axios from 'axios';
// import axiosInstance from '@/utils/axios';
// import { parse } from 'path';

export interface GatheringDetail {
  gatheringId: number;
  captainStatus: boolean;
  title: string;
  description: string;
  mainType: string;
  subType: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  mainLocation: string;
  subLocation: string;
  minCount: number;
  totalCount: number;
  participantCount: number;
  status: string;
  tags: Array<string>;
  participants: Array<GatheringParticipants>;
  averageRating: number;
  guestBookCount: number;
}

interface GatheringParticipants {
  memberId: number;
  nickName: string;
  profileImageUrl: string;
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { gatheringId } = context.params as { gatheringId: string };
  const numericGatheringId = Number(gatheringId);
  const apiEndpoint = `api/v1/gatherings/${numericGatheringId}`;
  // console.log(gatheringId);
  // if (!gatheringId) {
  //   throw new Error('Invalid gatheringId');
  // }

  // 클라이언트의 요청 헤더에서 쿠키 가져오기
  // const headers = {
  //   Cookie: context.req.headers.cookie || '',
  // };
  // const cookies = context.req.headers.cookie || '';

  // axios.defaults.headers.Cookie = cookies;

  // // 여기서 이제 axios 요청하기

  // axios.defaults.headers.Cookie = '';

  const gathering = await apiRequest<GatheringDetail>({
    param: apiEndpoint,
    // header: {},
  });

  return {
    props: { gathering },
  };

  // try {
  //   const response = await axiosInstance.get(apiEndpoint);
  //   return {
  //     props: { gathering: response.data },
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     props: { gathering: null },
  //   };
  // }
};
export default function GatheringDetail(gathering: GatheringDetail) {
  const router = useRouter();
  const gatheringId = router.query.gatheringId;
  const [showModal, setShowModal] = useState(false);
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

  const gatheringState: GatheringStateType = {
    gatheringJoinedFivePeopleImages: [
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
      'www.www.ww.w.w.w.w',
    ],
    gatheringAverageRating: 4.5,
    gatheringGuestbookCount: 100,
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
      reviewId: 0,
      rating: 3.5,
      content:
        '방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가능합니다방명록은 최대 300자까지 작성 가',
      createDate: '2025-01-10T02:30:13.671Z',
      writer: {
        memberId: 0,
        nickName: '유저닉네임10글자까지',
        profileImageUrl: 'string',
      },
      reviewOwnerStatus: true,
      gatheringId: 1,
    },
    {
      reviewId: 0,
      rating: 0,
      content: 'string',
      createDate: '2025-01-10T02:30:13.671Z',
      writer: {
        memberId: 0,
        nickName: 'string',
        profileImageUrl: 'string',
      },
      reviewOwnerStatus: true,
      gatheringId: 0,
    },
  ];

  const handleChallengeAddButtonClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    console.log(gatheringId);
  }, []);

  return (
    <div className="w-[1200px] flex flex-col place-self-center ">
      <GatheringInformation information={gathering} />
      <GatheringState state={gatheringState} />
      <div className="flex mt-[50px] w-full h-[49px] relative items-center justify-center">
        <Tab
          items={gatheringTabItems}
          currentTab={currentTab}
          onTabChange={(newTab) => setCurrentTab(newTab)}
          className="w-full absolute flex text-lg font-bold z-10"
        />
        {gathering.captainStatus && (
          <div className="w-full absolute flex justify-between z-20">
            <div></div>
            <button
              onClick={() => handleChallengeAddButtonClick()}
              className="text-lg hover:cursor-pointer"
            >
              {'+ 챌린지 추가하기'}
            </button>
          </div>
        )}
      </div>
      {/* 모달 */}
      {showModal && (
        <Modal
          title="챌린지 정보를 입력해주세요."
          onClose={() => setShowModal(false)}
        >
          <ChallengeAddModal onClose={() => setShowModal(false)} />
        </Modal>
      )}

      {currentTab === 'challenge' ? (
        <GatheringChallenge
          challenges={gatheringChallenge}
          captainStatus={gathering.captainStatus ?? false}
        />
      ) : (
        <GatheringGuestbook
          guestbooks={gatheringGuestbook}
          gatheringGuestbookCount={gatheringState.gatheringGuestbookCount}
        />
      )}
    </div>
  );
}
