import { useState } from 'react';
import Tab from '../../components/Tab';
import type { TabItem } from '@/types';

const MY_PAGE_TABS: TabItem[] = [
  {
    id: 'profile',
    label: '프로필'
  },
  {
    id: 'settings',
    label: '설정'
  },
  {
    id: 'test',
    label: '테스트'
  }

];

export default function MyPage() {
  const [currentTab, setCurrentTab] = useState<TabItem['id']>(MY_PAGE_TABS[0].id);

  const handleTabChange = (id: TabItem['id']) => {
    setCurrentTab(id);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 pt-[72px]">
      <Tab
        items={MY_PAGE_TABS}
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
      
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