import Loading from '@/components/dialog/Loading';
import { GatheringList } from '@/types';
import apiRequest from '@/utils/apiRequest';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';

interface CardlistProps {
  mainType: '전체' | '유산소형' | '무산소형' | '경기형';
}

export default function Cardlist({ mainType }: CardlistProps) {
  const param =
    mainType === '전체'
      ? '/api/v1/gatherings?sortBy=deadline&sortDirection=ASC&page=0&pageSize=6'
      : `/api/v1/gatherings?sortBy=deadline&sortDirection=ASC&page=0&pageSize=6&mainType=${mainType}`;

  const { data, isLoading } = useQuery<GatheringList>({
    queryKey: ['gatheringList', mainType],
    queryFn: async () => {
      return await apiRequest<GatheringList>({
        param,
      });
    },
  });

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {data &&
        data.content.map((gathering) => {
          return <Card key={gathering.gatheringId} />;
        })}
    </div>
  );
}
