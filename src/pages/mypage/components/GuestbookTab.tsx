import { useState } from 'react';
import Image from 'next/image';
import { GuestbookItem, GatheringItem, GatheringChallengeType, GatheringStateType, TabItem } from '@/types';
// import GuestbookModal from './GuestbookModal';
import Null from '@/components/common/Null';
import Button from '@/components/common/Button';
import Heart from '@/components/common/Heart';
import Popover from '@/components/common/Popover';
import SubTag from '@/components/tag/SubTag';
// import Modal from '@/components/dialog/Modal';
// // import Toast from '@/components/dialog/Toast';
// import useModalStore from '@/stores/useModalStore';


// GUESTBOOK_TABS 정의 추가
const GUESTBOOK_TABS: TabItem[] = [
  { id: 'available', label: '작성 가능한 방명록' },
  { id: 'written', label: '작성한 방명록' },
];


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
  // const [, setShowToast] = useState(false);
  // const {, setShowModal } = useModalStore();

  const [, setSelectedGuestbook] = useState<GuestbookItem | null>(null);
  const [, setSelectedGatheringId] = useState<number | null>(null);


  // 작성 가능한 방명록 필터링 로직
  const eligibleGatherings = gatherings.filter((gathering) => {
    // 모임장인 경우는 제외
    if (gathering.captainStatus) return false;

    const challenges = gatheringChallenges[gathering.gatheringId];
    // 1. 내가 참여한 모임이어야 함 (gatherings에 포함된 모임)
    // 2. 모임장이 아니어야 함 (captainStatus가 false)
    // 3. 진행중인 챌린지가 있어야 함
    // 4. 그 중 하나라도 인증이 완료된 챌린지가 있어야 함
    return challenges?.inProgressChallenges?.some(
      challenge => challenge.verificationStatus === true
    );
  });


  const handleEditClick = (guestbook: GuestbookItem) => {
    setSelectedGuestbook(guestbook);
    // setShowModal(true);
  };

  const handleWriteClick = (gatheringId: number) => {
    setSelectedGatheringId(gatheringId);
    // setShowModal(true);
  };

  // const handleModalClose = () => {
  //   setShowModal(false);
  //   setSelectedGatheringId(null);
  //   setRating(0);
  //   setContent('');
  // };

  // const handleSubmit = () => {
  //   console.log('submit', { rating, content, gatheringId: selectedGatheringId });
  //   handleModalClose();
  //   setShowToast(true);
  // };


  const handleTabChange = (id: TabItem['id']) => {
    setShowWritten(id === 'written');
  };

  return (
    <div className="pb-[50px]">
      <div className="flex justify-between items-center mb-[37px]">
        <SubTag
          tags={GUESTBOOK_TABS}
          currentTag={showWritten ? 'written' : 'available'}
          onTagChange={handleTabChange}
          className="flex"
        />
      </div>

      <div className="space-y-6">
        {showWritten ? (
          guestbooks.length > 0 ? (
            guestbooks.map((guestbook) => (
              <div
                key={guestbook.reviewId}
                className="flex gap-[30px] bg-dark-900 rounded-lg"
              >
                <div className="relative w-[300px] h-[200px]">
                  <Image
                    src="/assets/image/default_img.png"
                    alt="모임 이미지"
                    width={300}
                    height={200}
                    className="rounded-[20px] object-cover"
                  />
                </div>

                <div className="flex-1 py-6 pr-6">
                  <div className="flex justify-between items-start mb-4">
                    <Heart rating={guestbook.rating} />
                    <Popover
                      type="dot"
                      items={[
                        {
                          id: 'edit',
                          label: '수정하기',
                          onClick: () => handleEditClick(guestbook)
                        },
                        {
                          id: 'delete',
                          label: '삭제하기',
                          onClick: () => console.log('delete clicked')  // 삭제 핸들러 추가 필요
                        }
                      ]}
                    />
                  </div>

                  <p className="mb-4 break-all line-clamp-4">
                    {guestbook.content}
                  </p>

                  <div className="flex items-end justify-between">
                    {(() => {
                      const gathering = gatherings.find(g => g.gatheringId === guestbook.gatheringId);
                      return (
                        <>
                          <p className="text-primary font-normal">
                            {gathering?.gatheringTitle} |
                            {gathering?.gatheringSi}
                            {gathering?.gatheringGu}
                          </p>
                          <p className="text-dark-700 font-medium">
                            {gathering?.gatheringStartDate} ~ {gathering?.gatheringEndDate}
                          </p>
                        </>
                      );
                    })()}
                  </div>
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