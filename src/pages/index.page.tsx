import Tab from '@/components/common/Tab';
import { LISTPAGE_MAINTYPE } from '@/constants/MainList';
import ListChallenge from '@/pages/main/components/ListChallenge';
import { useState } from 'react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('전체');

  return (
    <div className="max-w-screen-xl mx-auto px-8 pt-20">
      <h2 className="text-[1.75rem] font-semibold pb-[30px]">
        지금 핫한 챌린지 🔥
      </h2>
      <div className="overflow-hidden">
        <ListChallenge />
      </div>
      <div className="mt-20">
        <Tab
          items={LISTPAGE_MAINTYPE}
          currentTab={currentTab}
          onTabChange={(newTab) => setCurrentTab(newTab)}
        />
      </div>
    </div>
  );
}
