import { useState, useCallback } from 'react';
import {
  GuestbookItem,
  GatheringItem,
  GatheringChallengeType,
  GatheringStateType,
  TabItem,
} from '@/types';
import SubTag from '@/components/tag/SubTag';
import Toast from '@/components/dialog/Toast';
import GuestbookModal from './guestbook/GuestbookModal';
import WrittenGuestbooks from './guestbook/WrittenGuestbooks';
import AvailableGuestbooks from './guestbook/AvailableGuestbooks';

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

export default function GuestbookTab({
  guestbooks = [],
  gatherings = [],
  gatheringChallenges = {},
  gatheringStates = {},
}: GuestbookTabProps) {
  const [showWritten, setShowWritten] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    isEditMode: boolean;
    gatheringId?: number;
    guestbook?: GuestbookItem;
  }>({ isOpen: false, isEditMode: false });

  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'check' as 'error' | 'check' | 'caution',
  });

  const showToast = useCallback((message: string, type: 'error' | 'check' | 'caution') => {
    setToast({ isVisible: true, message, type });
  }, []);

  const closeModal = useCallback(() => {
    if (modalState.isOpen) {
      showToast(
        `방명록 ${modalState.isEditMode ? '수정' : '작성'}이 취소되었습니다.`,
        'caution',
      );
    }
    setModalState({ isOpen: false, isEditMode: false });
  }, [modalState.isOpen, modalState.isEditMode, showToast]);

  const handleWriteClick = useCallback((gatheringId: number) => {
    setModalState({
      isOpen: true,
      isEditMode: false,
      gatheringId,
    });
  }, []);

  const handleEditClick = useCallback((guestbook: GuestbookItem) => {
    setModalState({
      isOpen: true,
      isEditMode: true,
      guestbook,
    });
  }, []);

  const handleModalSubmit = useCallback(() => {
    const message = modalState.isEditMode ? '수정' : '작성';
    setModalState({ isOpen: false, isEditMode: false });
    showToast(`방명록이 ${message}되었습니다.`, 'check');
  }, [modalState.isEditMode, showToast]);

  const handleValidationFail = useCallback(() => {
    showToast('방명록 내용을 입력해주세요.', 'error');
  }, [showToast]);

  const handleTabChange = useCallback((id: TabItem['id']) => setShowWritten(id === 'written'), []);

  const eligibleGatherings = useCallback(
    () =>
      gatherings.filter((gathering) => {
        if (gathering.captainStatus) return false;
        const challenges = gatheringChallenges[gathering.gatheringId];
        return challenges?.inProgressChallenges?.some(
          (challenge) => challenge.verificationStatus === true,
        );
      }),
    [gatherings, gatheringChallenges],
  );

  return (
    <div className="pb-[50px]">
      {/* 탭 컴포넌트 */}
      <div className="flex justify-between items-center mb-[37px]">
        <SubTag
          tags={GUESTBOOK_TABS}
          currentTag={showWritten ? 'written' : 'available'}
          onTagChange={handleTabChange}
          className="flex"
        />
      </div>

      {/* 방명록 리스트 */}
      {showWritten ? (
        <WrittenGuestbooks
          guestbooks={guestbooks}
          gatherings={gatherings}
          onEditClick={handleEditClick}
        />
      ) : (
        <AvailableGuestbooks
          gatherings={eligibleGatherings()}
          gatheringStates={gatheringStates}
          onWriteClick={handleWriteClick}
        />
      )}

      {/* 모달 */}
      {modalState.isOpen && (
        <GuestbookModal
          isEditMode={modalState.isEditMode}
          gatheringId={modalState.gatheringId}
          initialData={modalState.guestbook}
          onSubmit={handleModalSubmit}
          onValidationFail={handleValidationFail}
          onClose={closeModal} // 모달 닫기 핸들러
        />
      )}

      {/* Toast 컴포넌트 */}
      <Toast
        isOpen={toast.isVisible}
        setIsOpen={(isOpen) => setToast((prev) => ({ ...prev, isVisible: isOpen }))}
        type={toast.type}
        message={toast.message}
      />
    </div>
  );
}
