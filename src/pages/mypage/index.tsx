import { useState } from 'react';
import Tab from '../../components/Tap';

//일단 대충 만든거임
const MY_PAGE_TABS = [
  {
    id: 'profile',
    label: '프로필'
  },
  {
    id: 'settings',
    label: '설정'
  }
] as const;

export default function MyPage() {
  const [currentTab, setCurrentTab] = useState(MY_PAGE_TABS[0].id);

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 pt-[72px]">
      <Tab
        items={MY_PAGE_TABS}
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
      
      {/* 탭 컨텐츠 */}
      <div className="mt-6">
        {currentTab === 'profile' && (
          <div className="p-4 bg-white rounded-lg">
            프로필 내용
          </div>
        )}
      </div>
    </div>
  );
}