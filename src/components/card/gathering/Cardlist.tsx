import Loading from '@/components/dialog/Loading';
import { GatheringList } from '@/types';
import apiRequest from '@/utils/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { MainType } from '@/constants/MainList';
import Card from './Card';

interface CardlistProps {
  mainType: MainType;
  subType: string;
}

export default function Cardlist({ mainType, subType }: CardlistProps) {
  const param =
    mainType === '전체'
      ? '/api/v1/gatherings?sortBy=deadline&sortDirection=ASC&page=0&pageSize=6'
      : `/api/v1/gatherings?sortBy=deadline&sortDirection=ASC&page=0&pageSize=6&mainType=${mainType}&subType=${subType}`;

  const { data, isLoading } = useQuery<GatheringList>({
    queryKey: ['gatheringList', mainType, subType],
    queryFn: async () => {
      return await apiRequest<GatheringList>({ param });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      {data?.content.map((gathering) => (
        <Card key={gathering.gatheringId} data={gathering} />
      ))}
    </div>
  );
}
