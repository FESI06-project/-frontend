// pages/mypage/[memberId].tsx
import Tab from '@/components/common/Tab';
import Profile from './components/Profile';
import GatheringTab from './components/GatheringTab';
import GuestbookTab from './components/GuestbookTab';
import MyGatheringTab from './components/MyGatheringTab';
import CalendarTab from './components/CalendarTab';
import { useState } from 'react';
import type {
  TabItem,
  UserProfile,
  GatheringItem,
  GatheringStateType,
  GatheringChallengeType,
  GuestbookItem,
} from '@/types';

const MY_PAGE_TABS: TabItem[] = [
  { id: 'gathering', label: '나의 모임' },
  { id: 'guestbook', label: '나의 방명록' },
  { id: 'myGathering', label: '내가 만든 모임' },
  { id: 'calendar', label: '캘린더' },
];

export default function MyPage() {
  // const router = useRouter();
  // const memberId = router.query.memberId || 'defaultMemberId';
  const [currentTab, setCurrentTab] = useState<TabItem['id']>(
    MY_PAGE_TABS[0].id,
  );
  const [, setIsEditModalOpen] = useState(false);

  const user: UserProfile = {
    memberId: 'defaultMemberId',
    email: 'fitmon@fitmon.com',
    nickname: '김핏몬',
    profileImage: null,
  };
  // 핏몬이가 모임장인 모임 데이터
  const hostedGatherings: GatheringItem[] = [
    {
      gatheringId: 1,
      gatheringTitle:
        '모임은 최대 30자입니다 모임은 최대 30자입니다 모임은 최대 30자',
      gatheringImage: 'null',
      gatheringStatus: '진행중',
      gatheringStartDate: '2024.12.04',
      gatheringEndDate: '2025.01.23',
      gatheringMainType: '유산소형',
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
      gatheringStartDate: '2025.03.04',
      gatheringEndDate: '2025.03.23',
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
      gatheringEndDate: '2025.01.23',
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
    // router.push(`/detail/${gatheringId}`);
    console.log('모임 클릭:', gatheringId);
  };

  const handleProfileEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCancelReservation = async () => {
    // API 호출로 예약 취소 처리
  };

  return (
    <div className="w-full mx-auto pt-[80px]" style={{ maxWidth: '1200px' }}>
      <Profile user={user} onEditClick={handleProfileEdit} />

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
              onCancelReservation={handleCancelReservation}
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
              onCancelReservation={handleCancelReservation}
            />
          )}
          {currentTab === 'calendar' && <CalendarTab events={[]} />}
        </div>
      </div>
    </div>
  );
}
