// pages/mypage/[memberId].tsx
import { useRouter } from 'next/router';
import Tab from '@/components/Tab';
import Profile from './components/Profile';
import GatheringTab from './components/GatheringTab';
import GuestbookTab from './components/GuestbookTab';
import MyGatheringTab from './components/MyGatheringTab';
import CalendarTab from './components/CalendarTab';
import { useState } from 'react';
import type { TabItem, UserProfile, GatheringItem } from '@/types';

const MY_PAGE_TABS: TabItem[] = [
  { id: 'gathering', label: '모임' },
  { id: 'guestbook', label: '방명록' },
  { id: 'myGathering', label: '내가 만든 모임' },
  { id: 'calendar', label: '달력' }
];

export default function MyPage() {
  const router = useRouter();
  const memberId = router.query.memberId || 'defaultMemberId';
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
            <GuestbookTab guestbooks={[]} />
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