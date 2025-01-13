import { useState } from 'react';
import Image from 'next/image';
import { GuestbookItem, GatheringItem, GatheringChallengeType, GatheringStateType } from '@/types';
import GuestbookModal from './GuestbookModal';
import Null from '@/components/common/Null';
import Button from '@/components/common/Button';

interface GuestbookTabProps {
  guestbooks: GuestbookItem[];
  gatherings?: GatheringItem[];
  gatheringChallenges?: { [key: number]: GatheringChallengeType };
  gatheringStates?: { [key: number]: GatheringStateType };
}

// GuestbookTab의 필터링 로직과 상태 관리 부분
export default function GuestbookTab({
  guestbooks = [],
  gatherings = [],
  gatheringChallenges = {},
  gatheringStates = {}
}: GuestbookTabProps) {
  // 작성 가능한 방명록이 먼저 보이도록 기본값을 false로 설정
  const [showWritten, setShowWritten] = useState(false);
  const [, setModalOpen] = useState(false);
  const [, setSelectedGuestbook] = useState<GuestbookItem | null>(null);
  const [, setSelectedGatheringId] = useState<number | null>(null);

  // 작성 가능한 방명록 필터링 로직
  const eligibleGatherings = gatherings.filter((gathering) => {
    const challenges = gatheringChallenges[gathering.gatheringId];
    // 1. 내가 참여한 모임이어야 함 (gatherings에 포함된 모임)
    // 2. 진행중인 챌린지가 있어야 함
    // 3. 그 중 하나라도 인증이 완료된 챌린지가 있어야 함
    return challenges?.inProgressChallenges?.some(
      challenge => challenge.verificationStatus === true
    );
  });


  const handleEditClick = (guestbook: GuestbookItem) => {
    setSelectedGuestbook(guestbook);
    setModalOpen(true);
  };

  const handleWriteClick = (gatheringId: number) => {
    setSelectedGatheringId(gatheringId);
    setModalOpen(true);
  };

  return (
    <div className="pb-[50px]">
      <div className="flex justify-between items-center mb-[37px]">
        <div className="flex space-x-2 font-bold">
          <button
            onClick={() => setShowWritten(false)}
            className={`px-4 py-2 rounded-full ${showWritten ? 'bg-dark-500' : 'bg-primary'
              }`}
          >
            작성 가능한 방명록
          </button>
          <button
            onClick={() => setShowWritten(true)}
            className={`px-4 py-2 rounded-full ${!showWritten ? 'bg-dark-500' : 'bg-primary'
              }`}
          >
            작성한 방명록
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {showWritten ? (
          guestbooks.length > 0 ? (
            guestbooks.map((guestbook) => (
              <div
                key={guestbook.reviewId}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={guestbook.writer.profileImageUrl === 'null'
                        ? '/assets/image/default_img.png'
                        : guestbook.writer.profileImageUrl}
                      alt="프로필"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-semibold">{guestbook.writer.nickName}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-xl ${index < guestbook.rating
                              ? 'text-yellow-400'
                              : 'text-gray-200'
                            }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    {guestbook.reviewOwnerStatus && (
                      <button
                        onClick={() => handleEditClick(guestbook)}
                        className="text-sm px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        수정
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-dark-600 mb-3 leading-relaxed whitespace-pre-wrap">
                  {guestbook.content}
                </p>
                <div className="text-sm text-dark-500">
                  {new Date(guestbook.createDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            ))
          ) : (
            <Null message="아직 작성된 방명록이 없습니다." />
          )
        ) : eligibleGatherings.length > 0 ? (
          eligibleGatherings.map((gathering) => (
            <div key={gathering.gatheringId} className="flex gap-[30px]">
              <div className="relative w-[300px] h-[200px]">
                <Image
                  src={gathering.gatheringImage === "null"
                    ? '/assets/image/default_img.png'
                    : gathering.gatheringImage}
                  alt={gathering.gatheringTitle}
                  width={300}
                  height={200}
                  className="rounded-[20px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/assets/image/default_img.png';
                  }}
                />
              </div>

              <div className="flex flex-col flex-1 py-[19px]">
                <h3 className="text-primary font-normal mb-3.5">
                  {gathering.gatheringSubType} | {gathering.gatheringSi} {gathering.gatheringGu}
                </h3>
                <h2 className="text-xl font-bold mb-3.5">{gathering.gatheringTitle}</h2>
                <div className="flex items-center gap-[13px] text-dark-700 mb-[21px]">
                  <h4>{gathering.gatheringStartDate} ~ {gathering.gatheringEndDate}</h4>
                  <div className="flex items-center font-normal gap-2 text-white">
                    <Image
                      src="/assets/image/person.svg"
                      alt="참여자 아이콘"
                      width={18}
                      height={18}
                    />
                    <span>
                      {gatheringStates[gathering.gatheringId]?.gatheringJoinedPeopleCount}/
                      {gatheringStates[gathering.gatheringId]?.gatheringMaxPeopleCount}
                    </span>
                  </div>
                </div>
                <Button
                  name="방명록 작성하기"
                  style="custom"
                  className="w-[163px] h-[43px] text-base"
                  handleButtonClick={() => handleWriteClick(gathering.gatheringId)}
                />
              </div>
            </div>
          ))
        ) : (
          <Null message="작성 가능한 방명록이 없습니다." />
        )}
      </div>

      {/* <GuestbookModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedGuestbook(null);
          setSelectedGatheringId(null);
        }}
        initialData={selectedGuestbook}
        gatheringId={selectedGatheringId}
      /> */}
    </div>
  );
}