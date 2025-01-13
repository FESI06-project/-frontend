import Cardlist from '@/components/card/gathering/Cardlist';
import Button from '@/components/common/Button';
import Tab from '@/components/common/Tab';
import SubTag from '@/components/tag/SubTag';
import {
  LISTPAGE_MAINTYPE,
  LISTPAGE_SUBTYPE,
  MainType,
} from '@/constants/MainList';
import ListChallenge from '@/pages/main/components/ListChallenge';
import { useState } from 'react';

export default function Home() {
  const [mainType, setMainType] = useState<MainType>('전체');
  const [subType, setSubType] = useState('전체');

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
          currentTab={mainType}
          onTabChange={(newTab) => {
            setMainType(newTab as MainType);
            setSubType('전체');
          }}
          rightElement={
            <Button
              style="custom"
              name="모임 만들기"
              className="text-base my-2 h-10 w-32"
            />
          }
        />
      </div>
      <div className="mt-7">
        <SubTag
          tags={LISTPAGE_SUBTYPE[mainType]}
          currentTag={subType}
          onTagChange={(newTag) => setSubType(newTag)}
        />
      </div>
      <div className="mt-7">
        <Cardlist mainType={mainType} />
      </div>
    </div>
  );
}
