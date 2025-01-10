import { MainChallenge } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/utils/apiRequest';
import Loading from '@/components/dialog/Loading';
import ChallengeCard from './ChallengeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function ListChallenge() {
  const { data, isLoading, error } = useQuery<MainChallenge[]>({
    queryKey: ['mainChallengeList'],
    queryFn: async () => {
      return await apiRequest<MainChallenge[]>({
        param: '/api/v1/challenges',
      });
    },
  });

  if (error) {
    return <div>Error: 데이터를 가져오지 못했습니다.</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <Swiper
      spaceBetween={10}
      pagination={{ clickable: true }}
      slidesPerView={3.6}
      slidesPerGroup={1}
      breakpoints={{
        320: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 3.2,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 3.6,
          slidesPerGroup: 1,
        },
      }}
    >
      {data &&
        data.map((challenge) => (
          <SwiperSlide key={challenge.challengeId}>
            <ChallengeCard data={challenge} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
