import GatheringDetail from '@/pages/detail/[gatheringId].page';
import { ChallengeType, GuestbookItem } from '@/types';
import apiRequest from '@/utils/apiRequest';
import { create } from 'zustand';
export interface GatheringDetail {
  gatheringId: number;
  captainStatus: boolean;
  title: string;
  description: string;
  mainType: string;
  subType: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  mainLocation: string;
  subLocation: string;
  minCount: number;
  totalCount: number;
  participantCount: number;
  status: string;
  tags: Array<string>;
  participants: Array<GatheringParticipants>;
  averageRating: number;
  guestBookCount: number;
}

interface GatheringParticipants {
  memberId: number;
  nickName: string;
  profileImageUrl: string;
}

export interface GatheringStatus {
  participants: Array<GatheringParticipants>;
  minCount: number;
  totalCount: number;
  participantCount: number;
  status: string;
  averageRating: number;
  guestBookCount: number;
}

interface GatheringState {
  gathering?: GatheringDetail;
  gatheringStatus?: GatheringStatus;
  challenges?: Array<ChallengeType>;
  guestbooks?: Array<GuestbookItem>;
  fetchGathering: (gatheringId: number) => void;
  fetchGatheringStatus: (gatheringId: number) => void;
  fetchGatheringChallenges: (
    gatheringId: number,
    page: number,
    pageSize: number,
    status: string,
  ) => void;
  fetchGatheringGuestbooks: (
    gatheringId: number,
    page: number,
    pageSize: number,
  ) => void;
}

interface GatheringChallengeResponse {
  content: Array<ChallengeType>;
  hasNext: boolean;
}
const useGatheringStore = create<GatheringState>((set, get) => ({
  gathering: undefined,

  fetchGathering: async (gatheringId: number) => {
    try {
      const response = await apiRequest<GatheringDetail>({
        param: '/api/v1/gatherings/' + gatheringId,
        method: 'get',
      });
      console.log('response', response);
      set({ gathering: response });
    } catch (error) {
      throw error;
    }
  },

  fetchGatheringStatus: async (gatheringId: number) => {
    try {
      const response = await apiRequest<GatheringStatus>({
        param: '/api/v1/gatherings/' + gatheringId + '/status',
        method: 'get',
      });
      console.log('status response', response);
      set({ gatheringStatus: response });
    } catch (error) {
      throw error;
    }
  },

  fetchGatheringChallenges: async (
    gatheringId,
    page = 0,
    pageSize = 10,
    status = 'IN_PROGRESS',
  ) => {
    try {
      const response = await apiRequest<GatheringChallengeResponse>({
        param: `/api/v1/gatherings/${gatheringId}/challenges?page=${page}&pageSize=${pageSize}&status=${status}`,
        method: 'get',
      });
      set({ challenges: response.content });
    } catch (error) {
      throw error;
    }
  },

  fetchGatheringGuestbooks: async (gatheringId, page = 0, pageSize = 10) => {
    try {
      const response = await apiRequest<GatheringChallengeResponse>({
        param: `/api/v1/gatherings/${gatheringId}/guestbooks?page=${page}&pageSize=${pageSize}`,
        method: 'get',
      });
      set({ challenges: response.content });
    } catch (error) {
      throw error;
    }
  },
}));

export default useGatheringStore;
