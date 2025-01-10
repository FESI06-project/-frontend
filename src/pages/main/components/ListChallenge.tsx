import { useState } from 'react';
import { MainChallenge } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/utils/apiRequest';

export default function ListChallenge() {
  const [challenges, setChallenges] = useState<MainChallenge[] | null>([]);

  const { data } = useQuery<MainChallenge[]>({
    queryKey: ['mainChallengeList'],
    queryFn: async () => {
      return await apiRequest<MainChallenge[]>({
        param: '/api/v1/challenges',
      });
    },
  });

  console.log(data);

  return <div>챌린지 슬라이드 컴포넌트</div>;
}
