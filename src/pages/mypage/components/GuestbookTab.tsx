import { useState, useEffect, useCallback } from 'react';
import {
  GuestbookItem,
  GatheringItem,
  GatheringChallengeType,
  GatheringStateType,
  TabItem,
} from '@/types';
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

// GuestbookTab 컴포넌트
export default function GuestbookTab({
  guestbooks = [],
  gatherings = [],
  gatheringChallenges = {},
  gatheringStates = {},
}: GuestbookTabProps) {
  const [showWritten, setShowWritten] = useState(false);
  const { openModal, activeModal, closeModal, modalProps } = useModalStore();

  // Toast 상태 관리
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'check' as 'error' | 'check' | 'caution',
  });

  const [selectedGatheringId, setSelectedGatheringId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // 작성 가능한 방명록 필터링 로직
  const eligibleGatherings = useCallback(
    () =>
      gatherings.filter((gathering) => {
        if (gathering.captainStatus) return false;
        const challenges = gatheringChallenges[gathering.gatheringId];
        return challenges?.inProgressChallenges?.some(
          (challenge) => challenge.verificationStatus === true
        );
      }),
    [gatherings, gatheringChallenges]
  );

  // Toast 메시지 표시
  const showToastMessage = useCallback((
    message: string,
    type: 'error' | 'check' | 'caution'
  ) => {
    setToast({ isVisible: true, message, type });
  }, []);

  // 모달 상태 초기화
  const resetModalState = useCallback(() => {
    setSelectedGatheringId(null);
    setIsEditMode(false);
  }, []);

  // 모달 상태 변경 시 처리
  useEffect(() => {
    if (activeModal === null && selectedGatheringId && !toast.isVisible) {
      showToastMessage(
        `방명록 ${isEditMode ? '수정' : '작성'}이 취소되었습니다.`,
        'caution'
      );
      resetModalState();
    }
  }, [activeModal, isEditMode, selectedGatheringId, toast.isVisible, resetModalState, showToastMessage]);

  // 방명록 작성 버튼 핸들러
  const handleWriteClick = useCallback(
    (gatheringId: number) => {
      setSelectedGatheringId(gatheringId);
      setIsEditMode(false);
      openModal(ModalType.GUESTBOOK_WRITE, { gatheringId });
    },
    [openModal]
  );

  // 방명록 수정 버튼 핸들러
  const handleEditClick = useCallback(
    (guestbook: GuestbookItem) => {
      setIsEditMode(true);
      openModal(ModalType.GUESTBOOK_EDIT, { guestbook });
    },
    [openModal]
  );

  // 탭 변경 핸들러
  const handleTabChange = useCallback((id: TabItem['id']) => setShowWritten(id === 'written'), []);

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

      {/* 방명록 작성 모달 */}
      {activeModal === ModalType.GUESTBOOK_WRITE && (
        <GuestbookModal
          isEditMode={false}
          gatheringId={modalProps.gatheringId}
          onSubmit={() => {
            closeModal();
            showToastMessage('방명록이 작성되었습니다.', 'check');
          }}
          onValidationFail={() => {
            showToastMessage('방명록 내용을 입력해주세요.', 'error');
          }}
        />
      )}

      {/* 방명록 수정 모달 */}
      {activeModal === ModalType.GUESTBOOK_EDIT && (
        <GuestbookModal
          isEditMode={true}
          initialData={modalProps.guestbook}
          onSubmit={() => {
            closeModal();
            showToastMessage('방명록이 수정되었습니다.', 'check');
          }}
          onValidationFail={() => {
            showToastMessage('방명록 내용을 입력해주세요.', 'error');
          }}
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
