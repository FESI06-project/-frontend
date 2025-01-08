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
  gatheringEndDate: string;
  gatheringSi: string;
  gatheringGu: string;
  gatheringDescription: string;
  gatheringTags: string[];
  captainStatus: boolean | undefined;
  isReservationCancellable: boolean?;
}

export interface GatheringStateType {
  gatheringJoinedFivePeopleImages: string[]?;
  gatheringAverageRating: double;
  gatheringGuestbookCount: number;
  gatheringMaxPeopleCount: number;
  gatheringMinPeopleCount: number;
  gatheringJoinedPeopleCount: number;
  gatheringStatus: string;
}

export interface GatheringChallengeType {
  inProgressChallenges: Array<ChallengeType>;
  doneChallenges: Array<ChallengeType>;
}

export interface ChallengeType {
  challengeId: number;
  challengeImage: string;
  challengeTitle: string;
  challengeDescription: string;
  challengeJoinedPeopleCount: number;
  challengeSuccessPeopleCount: number;
  challengeParticipationStatus: boolean;
  challengeVerificationStatus: boolean;
}
export interface GuestbookItem {
  guestbookId: number;
  gatheringId: number;
  gatheringTitle: string;
  content: string;
  rating: number;
  createdAt: string;
}
