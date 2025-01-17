import { useRouter } from 'next/router';
import Tab from '@/components/common/Tab';
import Profile from './components/profile/Profile';
import JoinGathering from './components/join-gathering/JoinGathering';
import MyGathering from './components/my-gathering/MyGathering';
import Guestbook from './components/guestbook/Guestbook';
import Calendar from './components/calendar/Calendar';
import { useEffect, useState } from 'react';
import type { TabItem } from '@/types';
import useMemberStore from '@/stores/useMemberStore';

const MY_PAGE_TABS: TabItem[] = [
  { id: 'gathering', label: '나의 모임' },
  { id: 'guestbook', label: '나의 방명록' },
  { id: 'myGathering', label: '내가 만든 모임' },
  { id: 'calendar', label: '캘린더' },
];

const CURRENT_TAB_KEY = 'mypage_current_tab';

export default function MyPage() {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const { setIsLogin } = useMemberStore();

  // URL 쿼리와 localStorage에서 현재 탭 상태를 가져오기
  const [currentTab, setCurrentTab] = useState<TabItem['id']>(MY_PAGE_TABS[0].id);

  // 초기화 및 탭 상태 복원
  useEffect(() => {
    // 로그인 체크
    const isLoggedIn = localStorage.getItem('isLogin') === 'true';
    setIsLogin(isLoggedIn);

    if (!isLoggedIn) {
      const returnUrl = encodeURIComponent(window.location.href);
      router.replace(`/login?returnUrl=${returnUrl}`);
      return;
    }

    // 탭 상태 복원 (우선순위: URL 쿼리 > localStorage > 기본값)
    const tabFromQuery = router.query.tab as TabItem['id'];
    const tabFromStorage = localStorage.getItem(CURRENT_TAB_KEY) as TabItem['id'];
    const initialTab = tabFromQuery || tabFromStorage || MY_PAGE_TABS[0].id;

    // URL 업데이트 및 상태 설정
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: initialTab }
      },
      undefined,
      { shallow: true }
    );

    setCurrentTab(initialTab);
    localStorage.setItem(CURRENT_TAB_KEY, initialTab);
    setIsInitialized(true);
  }, [router.isReady, setIsLogin]);

  // URL 쿼리 변경 감지
  useEffect(() => {
    if (router.query.tab) {
      const newTab = router.query.tab as TabItem['id'];
      setCurrentTab(newTab);
      localStorage.setItem(CURRENT_TAB_KEY, newTab);
    }
  }, [router.query.tab]);

  const handleTabChange = (id: TabItem['id']) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: id }
      },
      undefined,
      { shallow: true }
    );
  };

  const handleGatheringClick = (gatheringId: number) => {
    console.log('모임 클릭:', gatheringId);
  };

  const handleCancelGathering = async (gatheringId: number) => {
    console.log('모임 취소:', gatheringId);
  };

  const handleCancelParticipation = async (gatheringId: number) => {
    console.log('참여 취소:', gatheringId);
  };

  if (!isInitialized) {
    return null;
  }

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