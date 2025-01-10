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
  inProgressChallenges: Array<ChallengeType>?;
  doneChallenges: Array<ChallengeType>?;
}

export interface GatheringChallegeProps {
  challenges: GatheringChallengeType;
  captainStatus: boolean;
}
export interface ChallengeType {
  gatheringId: number;
  challengeId: number;
  imageUrl: string;
  title: string;
  description: string;
  participantCount: number;
  successParticipantCount: number;
  participantStatus: boolean;
  verificationStatus: boolean;
  startDate: string;
  endDate: string;
}
export interface GuestbookItem {
  reviewId: number;
  content: string;
  rating: number;
  createDate: string;
  writer: GuestbookWriter;
  reviewOwnerStatus: boolean;
}

export interface GuestbookWriter {
  memberId: number;
  nickName: string;
  profileImageUrl: string;
}
