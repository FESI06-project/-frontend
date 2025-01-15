import Cardlist from '@/components/card/gathering/Cardlist';
import Tab from '@/components/common/Tab';
import SubTag from '@/components/tag/SubTag';
import {
  LISTPAGE_MAINTYPE,
  LISTPAGE_SUBTYPE,
  MainType,
} from '@/constants/MainList';
import { HydrationBoundary } from '@tanstack/react-query';
import { useState } from 'react';

export default function InterestedGatherings() {
  const [mainType, setMainType] = useState<MainType>('전체'); // 메인 타입 상태
  const [subType, setSubType] = useState('전체'); // 서브 타입 상태

  return (
    <div className="max-w-screen-xl mx-auto px-8 pt-20">
      {/* 메인 타입 탭 */}
      <div className="mt-20">
        <Tab
          items={LISTPAGE_MAINTYPE}
          currentTab={mainType}
          onTabChange={(newTab) => {
            setMainType(newTab as MainType);
            setSubType('전체'); // 메인 타입 변경 시 서브 타입 초기화
          }}
        />
      </div>

      {/* 서브 타입 태그 */}
      <div className="mt-7">
        {mainType !== '전체' && (
          <SubTag
            tags={LISTPAGE_SUBTYPE[mainType]}
            currentTag={subType}
            onTagChange={(newTag) => setSubType(newTag)}
          />
        )}
      </div>

      {/* 모임 카드 리스트 */}
      <div className="mt-7 pb-20">
        <HydrationBoundary>
          <Cardlist mainType={mainType} subType={subType} valid={true} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
