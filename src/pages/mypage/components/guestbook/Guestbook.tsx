import { useState, useCallback } from 'react';
import {
  TabItem,
} from '@/types';
import SubTag from '@/components/tag/SubTag';
import GuestbookModal from '../guestbook/GuestbookModal';
import WrittenGuestbooks from '../guestbook/WrittenGuestbooks';
import AvailableGuestbooks from '../guestbook/AvailableGuestbooks';
import useToastStore from '@/stores/useToastStore';
import {
  userGuestbooks,
  userGatherings,
  userGatheringChallenges,
  userGatheringStates
} from '@/pages/mypage/constants/constants';

const GUESTBOOK_TABS: TabItem[] = [
  { id: 'available', label: '작성 가능한 방명록' },
  { id: 'written', label: '작성한 방명록' },
];

export default function GuestbookTab() {
  const [showWritten, setShowWritten] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    isEditMode: boolean;
    gatheringId?: number;
    guestbook?: typeof userGuestbooks[0];
  }>({ isOpen: false, isEditMode: false });

  const showToast = useToastStore((state) => state.show);

  const handleModalSubmit = useCallback(() => {
    const message = modalState.isEditMode ? '수정' : '작성';
    setModalState({ isOpen: false, isEditMode: false });
    showToast(`방명록이 ${message}되었습니다.`, 'check');
  }, [modalState.isEditMode, showToast]);

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, isEditMode: false });
    showToast(
      `방명록 ${modalState.isEditMode ? '수정' : '작성'}이 취소되었습니다.`,
      'caution'
    );
  }, [modalState.isEditMode, showToast]);

  const handleValidationFail = useCallback(() => {
    showToast('방명록 내용을 입력해주세요.', 'error');
  }, [showToast]);

  const handleWriteClick = useCallback((gatheringId: number) => {
    setModalState({
      isOpen: true,
      isEditMode: false,
      gatheringId,
    });
  }, []);

  const handleEditClick = useCallback((guestbook: typeof userGuestbooks[0]) => {
    setModalState({
      isOpen: true,
      isEditMode: true,
      guestbook,
    });
  }, []);

  const handleTabChange = useCallback((id: TabItem['id']) => setShowWritten(id === 'written'), []);

  //쓸 수 있는 방명록 필터링 함수
  const eligibleGatherings = useCallback(
    () =>
      userGatherings.filter((gathering) => {
        if (gathering.captainStatus) return false;
        const challenges = userGatheringChallenges[gathering.gatheringId];
        return challenges?.inProgressChallenges?.some(
          (challenge) => challenge.verificationStatus === true,
        );
      }),
    [],
  );

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
          guestbooks={userGuestbooks}
          gatherings={userGatherings}
          onEditClick={handleEditClick}
        />
      ) : (
        <AvailableGuestbooks
          gatherings={eligibleGatherings()}
          gatheringStates={userGatheringStates}
          onWriteClick={handleWriteClick}
        />
      )}

      {modalState.isOpen && (
        <GuestbookModal
          isEditMode={modalState.isEditMode}
          gatheringId={modalState.gatheringId}
          initialData={modalState.guestbook}
          onSubmit={handleModalSubmit}
          onValidationFail={handleValidationFail}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}