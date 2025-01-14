import { GatheringItem } from '@/types';

export const sortGatheringsByDate = (gatherings: GatheringItem[]) => {
  return gatherings.slice().sort((a, b) => {
    const dateA = new Date(a.gatheringStartDate).getTime();
    const dateB = new Date(b.gatheringStartDate).getTime();
    return dateB - dateA; // 최신 날짜 우선
  });
};