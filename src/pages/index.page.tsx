import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Cardlist from '@/components/card/gathering/Cardlist';
import Button from '@/components/common/Button';
import Tab from '@/components/common/Tab';
import SubTag from '@/components/tag/SubTag';
import ListChallenge from '@/pages/main/components/ListChallenge';
import { GatheringList } from '@/types';
import apiRequest from '@/utils/apiRequest';
import {
  LISTPAGE_MAINTYPE,
  LISTPAGE_SUBTYPE,
  MainType,
} from '@/constants/MainList';

// 서버사이드 렌더링에서 초기 데이터를 가져오는 함수
export const getServerSideProps: GetServerSideProps = async () => {
  const pageSize = 6; // 한 페이지당 불러올 데이터 수
  const apiEndpoint = '/api/v1/gatherings';

  // 쿼리 파라미터 설정
  const queryParams = {
    sortBy: 'deadline',
    sortDirection: 'ASC',
    page: '0',
    pageSize: String(pageSize),
  };

  // API 요청 URL 생성
  const param = `${apiEndpoint}?${new URLSearchParams(queryParams).toString()}`;
  const initialData = await apiRequest<GatheringList>({ param });

  return {
    props: {
      initialData,
    },
  };
};

interface HomeProps {
  initialData: GatheringList;
}

export default function Home({ initialData }: HomeProps) {
  const [mainType, setMainType] = useState<MainType>('전체'); // 메인 타입 상태
  const [subType, setSubType] = useState('전체'); // 서브 타입 상태

  return (
    <div className="max-w-screen-xl mx-auto px-8 pt-20">
      {/* 페이지 제목 */}
      <h2 className="text-[1.75rem] font-semibold pb-[30px]">
        지금 핫한 챌린지 🔥
      </h2>

      {/* 핫한 챌린지 리스트 */}
      <div className="overflow-hidden">
        <ListChallenge />
      </div>

      {/* 메인 타입 탭 */}
      <div className="mt-20">
        <Tab
          items={LISTPAGE_MAINTYPE}
          currentTab={mainType}
          onTabChange={(newTab) => {
            setMainType(newTab as MainType);
            setSubType('전체'); // 메인 타입 변경 시 서브 타입 초기화
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
        <Cardlist
          mainType={mainType}
          subType={subType}
          initialData={initialData}
        />
      </div>
    </div>
  );
}
