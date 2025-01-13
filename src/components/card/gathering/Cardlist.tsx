import Loading from '@/components/dialog/Loading';
import apiRequest from '@/utils/apiRequest';
import { useQuery } from '@tanstack/react-query';

export default function Cardlist() {
  const { data, isLoading } = useQuery({
    queryKey: ['gatheringList'],
    queryFn: async () => {
      return await apiRequest({
        param:
          '/api/v1/gatherings?sortBy=deadline&sortDirection=ASC&page=0&pageSize=6',
      });
    },
  });

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }
}
