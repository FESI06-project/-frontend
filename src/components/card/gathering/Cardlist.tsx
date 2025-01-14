import Loading from '@/components/dialog/Loading';
import { GatheringList } from '@/types';
import apiRequest from '@/utils/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { MainType } from '@/constants/MainList';
import Card from './Card';
import Null from '@/components/common/Null';

interface CardlistProps {
  mainType: MainType;
  subType: string;
}

export default function Cardlist({ mainType, subType }: CardlistProps) {
  const apiEndpoint = '/api/v1/gatherings';
  const queryParams = {
    sortBy: 'deadline',
    sortDirection: 'ASC',
    page: String(0),
    pageSize: String(6),
    ...(mainType !== '전체' && { mainType }),
    ...(subType !== '전체' && { subType }),
  };

  const param = `${apiEndpoint}?${new URLSearchParams(queryParams).toString()}`;

  const {
    data = { content: [] },
    isLoading,
    error,
  } = useQuery<GatheringList>({
    queryKey: ['gatheringList', mainType, subType],
    queryFn: async () => {
      return await apiRequest<GatheringList>({ param });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Null message="데이터를 불러오는 중 오류가 발생했습니다." />;
  }

  return (
    <>
      {data?.content.length > 0 ? (
        <div className="grid grid-cols-2 gap-5">
          {data.content.map((gathering) => (
            <Card key={gathering.gatheringId} data={gathering} />
          ))}
        </div>
      ) : (
        <Null message="아직 모임이 없습니다." />
      )}
    </>
  );
}
