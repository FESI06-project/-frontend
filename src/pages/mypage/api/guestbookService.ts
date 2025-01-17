// // api/guestbookService.ts
// import apiRequest from '@/utils/apiRequest';
// import { GuestbookItem, PageResponse } from '@/types';

// interface CreateGuestbookRequest {
//   rating: number;
//   content: string;
// }

// interface UpdateGuestbookRequest {
//   rating: number;
//   content: string;
// }

// export const guestbookService = {
//   // 내가 작성한 방명록 목록 조회
//   getMyGuestbooks: async (page = 0, pageSize = 10) => {
//     return await apiRequest<PageResponse<GuestbookItem>>({
//       param: `api/v1/guestbooks/my?page=${page}&pageSize=${pageSize}`,
//       method: 'get'
//     });
//   },

//   // 방명록 작성
//   createGuestbook: async (gatheringId: number, data: CreateGuestbookRequest) => {
//     return await apiRequest<void>({
//       param: `api/v1/gatherings/${gatheringId}/guestbooks`,
//       method: 'post',
//       requestData: data
//     });
//   },

//   // 방명록 수정
//   updateGuestbook: async (gatheringId: number, guestbookId: number, data: UpdateGuestbookRequest) => {
//     return await apiRequest<void>({
//       param: `api/v1/gatherings/${gatheringId}/guestbooks/${guestbookId}`,
//       method: 'put',
//       requestData: data
//     });
//   },

//   // 방명록 삭제
//   deleteGuestbook: async (gatheringId: number, guestbookId: number) => {
//     return await apiRequest<void>({
//       param: `api/v1/gatherings/${gatheringId}/guestbooks/${guestbookId}`,
//       method: 'delete'
//     });
//   }
// };