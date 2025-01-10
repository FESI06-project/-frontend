import { MainChallenge } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/utils/apiRequest';
import Loading from '@/components/dialog/Loading';
import ChallengeCard from './ChallengeCard';

export default function ListChallenge() {
  const { data, isLoading } = useQuery<MainChallenge[]>({
    queryKey: ['mainChallengeList'],
    queryFn: async () => {
      return await apiRequest<MainChallenge[]>({
        param: '/api/v1/challenges',
      });
    },
  });

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex gap-5">
      {data?.map((challenge) => {
        return <ChallengeCard data={challenge} key={challenge.challengeId} />;
      })}
    </div>
  );
}
