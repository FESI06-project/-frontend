import { useRouter } from 'next/router';
import Tab from '@/components/common/Tab';
import Profile from './components/profile/Profile';
import GatheringTab from './components/tab/GatheringTab';
import GuestbookTab from './components/tab/GuestbookTab';
import MyGatheringTab from './components/tab/MyGatheringTab';
import CalendarTab from './components/tab/CalendarTab';
import { useEffect, useState } from 'react';
import type {
  TabItem,
  GatheringItem,
  GatheringStateType,
  GatheringChallengeType,
  GuestbookItem,
} from '@/types';
import useMemberStore from '@/stores/useMemberStore';

const MY_PAGE_TABS: TabItem[] = [
  { id: 'gathering', label: '나의 모임' },
  { id: 'guestbook', label: '나의 방명록' },
  { id: 'myGathering', label: '내가 만든 모임' },
  { id: 'calendar', label: '캘린더' },
];


export default function MyPage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<TabItem['id']>(MY_PAGE_TABS[0].id);
  const {
    setIsLogin,
  } = useMemberStore();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLogin') === 'true';
    console.log('Is logged in:', isLoggedIn);
    setIsLogin(isLoggedIn);

    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [setIsLogin, router]);



  // const handleTabChange = (id: TabItem['id']) => {
  //   setCurrentTab(id);
  // };



  // 핏몬이가 모임장인 모임 데이터
  const hostedGatherings: GatheringItem[] = [
    {
      gatheringId: 1,
      gatheringTitle:
        '모임은 최대 30자입니다 모임은 최대 30자입니다 모임은 최대 30자',
      gatheringImage: 'null',
      gatheringStatus: '진행중',
      gatheringStartDate: '2025.01.08',
      gatheringEndDate: '2025.01.12',
      gatheringMainType: '경기형',
      gatheringSubType: '런닝',
      gatheringSi: '대전',
      gatheringGu: '서구',
      gatheringTags: ['심심할 때', '스트레스', '런닝'],
      gatheringDescription:
        '디스크립션은50자까지 올수있습니답둘셋넷 디스크립션은50자까지 올수있습니답둘셋넷',
      captainStatus: true,
      isReservationCancellable: false,
    },
  ];

  // 호스트 모임 상태 정보
  const hostedGatheringStates: { [key: number]: GatheringStateType } = {
    1: {
      gatheringJoinedFivePeopleImages: ['profile1.jpg', 'profile2.jpg'],
      gatheringAverageRating: 4.5,
      gatheringGuestbookCount: 333,
      gatheringMaxPeopleCount: 20,
      gatheringMinPeopleCount: 3,
      gatheringJoinedPeopleCount: 8,
      gatheringStatus: '진행중',
    },
  };

  // 호스트 모임 챌린지 정보
  const hostedGatheringChallenges: { [key: number]: GatheringChallengeType } = {
    1: {
      inProgressChallenges: [
        {
          gatheringId: 1,

          challengeId: 1,
          imageUrl: 'null',
          title: '챌린지 제목은 최대 25자입니다',
          description: '매일 달리기 인증하기',
          participantCount: 3,
          successParticipantCount: 2,
          participantStatus: true,
          verificationStatus: true,
          startDate: '2020-20-20',
          endDate: '2020-20-20',
        },
        {
          gatheringId: 1,
          challengeId: 1,
          imageUrl: 'null',
          title: '챌린지 제목은 최대 25자입니다',
          description: '매일 달리기 인증하기',
          participantCount: 3,
          successParticipantCount: 2,
          participantStatus: true,
          verificationStatus: true,
          startDate: '2020-20-20',
          endDate: '2020-20-20',
        },
      ],
      doneChallenges: [],
    },
  };

  const userGatherings: GatheringItem[] = [
    {
      gatheringId: 2,
      gatheringTitle:
        '모임은 최대 30자입니다 모임은 최대 30자입니다 모임은 최대 30자',
      gatheringImage: 'null',
      gatheringStatus: '진행중',
      gatheringStartDate: '2025.01.23',
      gatheringEndDate: '2025.02.1',
      gatheringMainType: '근력형',
      gatheringSubType: '헬스',
      gatheringSi: '대전',
      gatheringGu: '유성구',
      gatheringTags: ['헬스', '근력', '저녁운동'],
      gatheringDescription:
        '디스크립션은50자까지 올수있습니답둘셋넷 디스크립션은50자까지 올수있습니답둘셋넷',
      captainStatus: false,
      isReservationCancellable: false,
    },
    {
      gatheringId: 3,
      gatheringTitle:
        '모임은 최대 30자입니다 모임은 최대 30자입니다 모임은 최대 30자',
      gatheringImage: 'null',
      gatheringStatus: '시작전',
      gatheringStartDate: '2024.12.04',
      gatheringEndDate: '2025.01.01',
      gatheringMainType: '유산소형',
      gatheringSubType: '수영',
      gatheringSi: '대전',
      gatheringGu: '중구',
      gatheringTags: ['수영', '아침운동', '초보환영'],
      gatheringDescription:
        '디스크립션은50자까지 올수있습니답둘셋넷 디스크립션은50자까지 올수있습니답둘셋넷',
      captainStatus: false,
      isReservationCancellable: false,
    },
  ];

  // 참여 모임 상태 정보
  const userGatheringStates: { [key: number]: GatheringStateType } = {
    2: {
      gatheringJoinedFivePeopleImages: ['profile3.jpg', 'profile4.jpg'],
      gatheringAverageRating: 4.8,
      gatheringGuestbookCount: 245,
      gatheringMaxPeopleCount: 20,
      gatheringMinPeopleCount: 3,
      gatheringJoinedPeopleCount: 4,
      gatheringStatus: '진행중',
    },
    3: {
      gatheringJoinedFivePeopleImages: ['profile5.jpg', 'profile6.jpg'],
      gatheringAverageRating: 4.2,
      gatheringGuestbookCount: 178,
      gatheringMaxPeopleCount: 20,
      gatheringMinPeopleCount: 3,
      gatheringJoinedPeopleCount: 5,
      gatheringStatus: '모집중',
    },
  };

  const userGatheringChallenges: { [key: number]: GatheringChallengeType } = {
    2: {
      inProgressChallenges: [
        {
          gatheringId: 1,
          challengeId: 3,
          imageUrl: 'null',
          title: '챌린지 제목은 최대 25자입니다.25자입니다',
          description: '하체운동 인증',
          participantCount: 3,
          successParticipantCount: 2,
          participantStatus: true,
          verificationStatus: true,
          startDate: 'string',
          endDate: 'string',
        },
        {
          gatheringId: 1,
          challengeId: 3,
          imageUrl: 'null',
          title: '챌린지 제목은 최대 25자입니다 25자입니다',
          description: '하체운동 인증',
          participantCount: 3,
          successParticipantCount: 2,
          participantStatus: true,
          verificationStatus: false,
          startDate: 'string',
          endDate: 'string',
        },
        {
          gatheringId: 1,
          challengeId: 3,
          imageUrl: 'null',
          title: '챌린지 제목은 최대 25자입니다25자입니다cho',
          description: '하체운동 인증',
          participantCount: 3,
          successParticipantCount: 2,
          participantStatus: true,
          verificationStatus: false,
          startDate: 'string',
          endDate: 'string',
        },
      ],
      doneChallenges: [],
    },
    3: {
      inProgressChallenges: [
        {
          gatheringId: 1,
          challengeId: 3,
          imageUrl: 'null',
          title: '챌린지 제목은 최대 25자입니다 ',
          description: '하체운동 인증',
          participantCount: 3,
          successParticipantCount: 2,
          participantStatus: true,
          verificationStatus: false,
          startDate: 'string',
          endDate: 'string',
        },
      ],
      doneChallenges: [],
    },
  };

  const userGuestbooks: GuestbookItem[] = [
    {
      reviewId: 1,
      content: '매일 운동하는 습관을 기를 수 있어서 좋았어요. 모임장님도 친절하시고 다른 멤버분들도 다들 열정적이셔서 동기부여가 많이 됐습니다!',
      rating: 5,
      createDate: '2024-01-15T09:30:00.000Z',
      writer: {
        memberId: 1,
        nickName: '러닝조아',
        profileImageUrl: 'null'
      },
      reviewOwnerStatus: true,
      gatheringId: 2
    },
    {
      reviewId: 2,
      content: '초보자도 부담없이 참여할 수 있어서 좋았어요. 다음에도 이런 모임이 있다면 또 참여하고 싶네요!',
      rating: 4,
      createDate: '2024-01-10T15:20:00.000Z',
      writer: {
        memberId: 2,
        nickName: '헬스왕',
        profileImageUrl: 'null'
      },
      reviewOwnerStatus: true,
      gatheringId: 2
    }
  ];

  const handleTabChange = (id: TabItem['id']) => {
    setCurrentTab(id);
  };

  const handleGatheringClick = (gatheringId: number) => {
    // router.push(/detail/${gatheringId});
    console.log('모임 클릭:', gatheringId);
  };

  const handleCancelGathering = async (gatheringId: number) => {
    // 모임장이 모임을 취소하는 API 호출
    console.log('모임 취소:', gatheringId);
  };

  const handleCancelParticipation = async (gatheringId: number) => {
    // 참여자가 참여를 취소하는 API 호출
    console.log('참여 취소:', gatheringId);
  };

  return (
    <div className="w-full mx-auto pt-[80px]" style={{ maxWidth: '1200px' }}>
      <Profile />

      <div className="mt-14">
        <Tab
          items={MY_PAGE_TABS}
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />

        <div className="mt-[37px]">
          {currentTab === 'gathering' && (
            <GatheringTab
              gatherings={userGatherings}
              gatheringStates={userGatheringStates}
              gatheringChallenges={userGatheringChallenges}
              onGatheringClick={handleGatheringClick}
              onCancelParticipation={handleCancelParticipation}
            />
          )}
          {currentTab === 'guestbook' && (
            <GuestbookTab
              guestbooks={userGuestbooks}
              gatherings={userGatherings}  // hostedGatherings 제외
              gatheringChallenges={userGatheringChallenges}
              gatheringStates={userGatheringStates}
            />
          )}
          {currentTab === 'myGathering' && (
            <MyGatheringTab
              gatherings={hostedGatherings}
              gatheringStates={hostedGatheringStates}
              gatheringChallenges={hostedGatheringChallenges}
              onGatheringClick={handleGatheringClick}
              onCancelGathering={handleCancelGathering}
            />
          )}
          {currentTab === 'calendar' && (
            <CalendarTab
              events={[
                ...hostedGatherings.map((gathering) => ({
                  gatheringId: gathering.gatheringId,
                  gatheringTitle: gathering.gatheringTitle,
                  startDate: gathering.gatheringStartDate,
                  endDate: gathering.gatheringEndDate,
                  isHost: true, // 호스트 데이터 표시
                  gatheringMainType: gathering.gatheringMainType,
                })),
                ...userGatherings.map((gathering) => ({
                  gatheringId: gathering.gatheringId,
                  gatheringTitle: gathering.gatheringTitle,
                  startDate: gathering.gatheringStartDate,
                  endDate: gathering.gatheringEndDate,
                  isHost: false, // 유저 데이터 표시
                  gatheringMainType: gathering.gatheringMainType,
                })),
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
