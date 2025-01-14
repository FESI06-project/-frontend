import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Loading from '@/components/dialog/Loading';
import Null from '@/components/common/Null';
import Card from './Card';
import { GatheringList } from '@/types';
import apiRequest from '@/utils/apiRequest';
import { MainType } from '@/constants/MainList';

interface CardlistProps {
  mainType: MainType;
  subType: string;
}

export default function Cardlist({ mainType, subType }: CardlistProps) {
  const pageSize = 6;

  const fetchGatherings = async ({ pageParam = 0 }: QueryFunctionContext) => {
    const apiEndpoint = '/api/v1/gatherings';
    const queryParams = {
      sortBy: 'deadline',
      sortDirection: 'ASC',
      page: String(pageParam),
      pageSize: String(pageSize),
      ...(mainType !== '전체' && { mainType }),
      ...(subType !== '전체' && { subType }),
    };

    const param = `${apiEndpoint}?${new URLSearchParams(queryParams).toString()}`;
    return await apiRequest<GatheringList>({ param });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<GatheringList, Error>({
    queryKey: ['gatheringList', mainType, subType],
    queryFn: fetchGatherings,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.content.length > 0 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const observerRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    isLoading: isFetchingNextPage,
    hasNextPage: !!hasNextPage,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Null message="데이터를 불러오는 중 오류가 발생했습니다." />;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        {data?.pages.map((page) =>
          page.content.map((gathering) => (
            <Card key={gathering.gatheringId} data={gathering} />
          )),
        )}
      </div>
      <div ref={observerRef} style={{ height: '1px' }} />
    </>
  );
}
