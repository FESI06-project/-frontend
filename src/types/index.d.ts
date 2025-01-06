export interface TabItem {
  id: string;
  label: string;
}
export interface UserProfile {
  memberId: string;
  email: string;
  nickname: string;
  profileImage: string | null;
}
export interface GatheringItem {
  gatheringId: number;
  gatheringTitle: string;
  gatheringImage: string;
  gatheringStatus: '모집중' | '진행중' | '완료';
  gatheringMainType: string;
  gatheringSubType: string;
  gatheringStartDate: string;
  isReservationCancellable: boolean;
}
export interface GuestbookItem {
  guestbookId: number;
  gatheringId: number;
  gatheringTitle: string;
  content: string;
  rating: number;
  createdAt: string;
}