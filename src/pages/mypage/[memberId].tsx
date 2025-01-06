// pages/mypage/[memberId].tsx
import { useRouter } from 'next/router';
import Tab from '@/components/Tab';
import Profile from './components/profile/Profile';
import GatheringTab from './components/gathering/GatheringTab';
import GuestbookTab from './components/guest_book/GuestbookTab';
import MyGatheringTab from './components/my_gathering/MyGatheringTab';
import CalendarTab from './components/calendar/CalendarTab';
import { useState } from 'react';
import type { TabItem, UserProfile, GatheringItem, GuestbookItem } from '@/types';

const MY_PAGE_TABS: TabItem[] = [
  { id: 'gathering', label: '모임' },
  { id: 'guestbook', label: '방명록' },
  { id: 'myGathering', label: '내가 만든 모임' },
  { id: 'calendar', label: '달력' }
];

export default function MyPage() {
  const router = useRouter();
  const memberId = router.query.memberId;
  const [currentTab, setCurrentTab] = useState<TabItem['id']>(MY_PAGE_TABS[0].id);
  const [, setIsEditModalOpen] = useState(false);

  const user: UserProfile = {
    memberId: memberId as string,
    email: "fitmon@fitmon.com",
    nickname: "김핏몬",
    profileImage: null
  };

  const userGatherings: GatheringItem[] = [
    {
      gatheringId: 1,
      gatheringTitle: '런닝 모임',
      gatheringImage: 'example.jpg',
      gatheringStatus: '모집중',
      gatheringMainType: '유산소',
      gatheringSubType: '런닝',
      gatheringStartDate: '2025-01-10',
      isReservationCancellable: true
    }
  ];

  const guestbooks: GuestbookItem[] = [
    {
      guestbookId: 1,
      gatheringId: 101,
      gatheringTitle: '아침 러닝 크루',
      content: '매일 아침 함께 달리니 너무 즐거웠어요! 다음에도 꼭 참여하고 싶습니다.',
      rating: 5,
      createdAt: '2024-01-05'
    },
    {
      guestbookId: 2,
      gatheringId: 102,
      gatheringTitle: '주말 등산 모임',
      content: '처음 등산해봤는데 리더님이 잘 이끌어주셔서 완주할 수 있었습니다.',
      rating: 4,
      createdAt: '2024-01-03'
    },
    {
      guestbookId: 3,
      gatheringId: 103,
      gatheringTitle: '실내 클라이밍',
      content: '처음이라 걱정했는데 친절하게 알려주셔서 재미있게 배웠습니다!',
      rating: 5,
      createdAt: '2024-01-01'
    }
  ];
  const handleTabChange = (id: TabItem['id']) => {
    setCurrentTab(id);
  };

  const handleGatheringClick = (gatheringId: number) => {
    router.push(`/detail/${gatheringId}`);
  };

  const handleProfileEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCancelReservation = async () => {
    // API 호출로 예약 취소 처리
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 pt-[72px]">
      <Profile user={user} onEditClick={handleProfileEdit} />

      <div className="mt-8">
        <Tab
          items={MY_PAGE_TABS}
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
        
        <div className="mt-6">
          {currentTab === 'gathering' && (
            <GatheringTab 
              gatherings={userGatherings}
              onGatheringClick={handleGatheringClick}
              onCancelReservation={handleCancelReservation}
            />
          )}
          {currentTab === 'guestbook' && (
            <GuestbookTab guestbooks={guestbooks} />
          )}
          {currentTab === 'myGathering' && (
            <MyGatheringTab 
              myGatherings={[]}
              onGatheringClick={handleGatheringClick}
            />
          )}
          {currentTab === 'calendar' && (
            <CalendarTab events={[]} />
          )}
        </div>
      </div>
    </div>
  );
}