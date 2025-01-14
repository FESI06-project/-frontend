import { useState, useEffect } from 'react';

import { GuestbookItem, GatheringItem, GatheringChallengeType, GatheringStateType, TabItem } from '@/types';
import SubTag from '@/components/tag/SubTag';
import Toast from '@/components/dialog/Toast';
import useModalStore, { ModalType } from '@/stores/useModalStore';
import GuestbookModal from './guestbook/GuestbookModal';
import WrittenGuestbooks from './guestbook/WrittenGuestbooks';
import AvailableGuestbooks from './guestbook/AvailableGuestbooks';

// GUESTBOOK_TABS 정의 추가
const GUESTBOOK_TABS: TabItem[] = [
  { id: 'available', label: '작성 가능한 방명록' },
  { id: 'written', label: '작성한 방명록' },
];


interface GuestbookTabProps {
  guestbooks: GuestbookItem[];
  gatherings?: GatheringItem[];
  gatheringId?: number;
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
  const { openModal, activeModal, closeModal, modalProps } = useModalStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [, setSelectedGuestbook] = useState<GuestbookItem | null>(null);
  const [selectedGatheringId, setSelectedGatheringId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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


  useEffect(() => {
    if (activeModal === null && selectedGatheringId) { // 모달이 닫히고 작업 중이었던 경우에만
      setToastMessage(`방명록 ${isEditMode ? '수정' : '작성'}이 취소되었습니다.`);
      setShowToast(true);
      setSelectedGuestbook(null);
      setSelectedGatheringId(null);
      setIsEditMode(false);
    }
  }, [activeModal, isEditMode, selectedGatheringId]);

  const handleWriteClick = (gatheringId: number) => {
    setSelectedGatheringId(gatheringId);  // 아직 필요한 경우를 위해 유지
    setIsEditMode(false);
    openModal(ModalType.GUESTBOOK_WRITE, { gatheringId });
  };

  const handleEditClick = (guestbook: GuestbookItem) => {
    setSelectedGuestbook(guestbook);  // 아직 필요한 경우를 위해 유지
    setIsEditMode(true);
    openModal(ModalType.GUESTBOOK_EDIT, { guestbook });
  };


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

      {showWritten ? (
        <WrittenGuestbooks
          guestbooks={guestbooks}
          gatherings={gatherings}
          onEditClick={handleEditClick}
        />
      ) : (
        <AvailableGuestbooks
          gatherings={eligibleGatherings}
          gatheringStates={gatheringStates}
          onWriteClick={handleWriteClick}
        />
      )}
      {activeModal === ModalType.GUESTBOOK_WRITE && (
        <GuestbookModal
          isEditMode={false}
          gatheringId={modalProps.gatheringId}
          onSubmit={() => {
            closeModal();
            setToastMessage("방명록이 작성되었습니다.");
            setShowToast(true);
          }}
          onValidationFail={() => {
            setToastMessage("방명록 내용을 입력해주세요.");
            setShowToast(true);
          }}
        />
      )}

      {activeModal === ModalType.GUESTBOOK_EDIT && (
        <GuestbookModal
          isEditMode={true}
          initialData={modalProps.guestbook}
          onSubmit={() => {
            closeModal();
            setToastMessage("방명록이 수정되었습니다.");
            setShowToast(true);
          }}
          onValidationFail={() => {
            setToastMessage("방명록 내용을 입력해주세요.");
            setShowToast(true);
          }}
        />
      )}

      <Toast
        isOpen={showToast}
        setIsOpen={setShowToast}
        type="check"
        message={toastMessage}
      />
    </div>
  );
}