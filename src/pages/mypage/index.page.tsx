import { useRouter } from 'next/router';
import Tab from '@/components/common/Tab';
import Profile from './components/profile/Profile';
import JoinGathering from './components/join-gathering/JoinGathering';
import MyGathering from './components/my-gathering/MyGathering';
import Guestbook from './components/guestbook/Guestbook';
import Calendar from './components/calendar/Calendar';
import { useEffect, useState } from 'react';
import type {TabItem} from '@/types';
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
            <JoinGathering
              onGatheringClick={handleGatheringClick}
              onCancelParticipation={handleCancelParticipation}

            />
          )}
          {currentTab === 'guestbook' && (
            <Guestbook />
          )}
          {currentTab === 'myGathering' && (
            <MyGathering
              onGatheringClick={handleGatheringClick}
              onCancelGathering={handleCancelGathering}
            />
          )}
          {currentTab === 'calendar' && (
            <Calendar />
          )}
        </div>
      </div>
    </div>
  );
}
