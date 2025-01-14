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

  //토스트
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'error' | 'check' | 'caution'>('check');

  const [selectedGatheringId, setSelectedGatheringId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // 작성 가능한 방명록 필터링 로직
  // 1. 내가 참여한 모임이어야 함 (gatherings에 포함된 모임)
  // 2. 모임장이 아니어야 함 (captainStatus가 false)
  // 3. 진행중인 챌린지가 있어야 함
  // 4. 그 중 하나라도 인증이 완료된 챌린지가 있어야 함
  const eligibleGatherings = gatherings.filter((gathering) => {
    if (gathering.captainStatus) return false;
    const challenges = gatheringChallenges[gathering.gatheringId];
    return challenges?.inProgressChallenges?.some(
      challenge => challenge.verificationStatus === true
    );
  });

  // 모달이 닫힐 때 취소 메시지 표시
  useEffect(() => {
    if (activeModal === null && selectedGatheringId && !showToast) {
      showToastMessage(
        `방명록 ${isEditMode ? '수정' : '작성'}이 취소되었습니다.`,
        'caution'
      );
      resetModalState();
    }
  }, [activeModal, isEditMode, selectedGatheringId, showToast]);

  // Toast 메시지 표시 함수
  const showToastMessage = (message: string, type: 'error' | 'check' | 'caution') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // 모달 상태 초기화
  const resetModalState = () => {
    setSelectedGatheringId(null);
    setIsEditMode(false);
  };

  // 방명록 작성 버튼 핸들러
  const handleWriteClick = (gatheringId: number) => {
    setSelectedGatheringId(gatheringId);
    setIsEditMode(false);
    openModal(ModalType.GUESTBOOK_WRITE, { gatheringId });
  };

  // 방명록 수정 버튼 핸들러
  const handleEditClick = (guestbook: GuestbookItem) => {
    setIsEditMode(true);
    openModal(ModalType.GUESTBOOK_EDIT, { guestbook });
  };

  // 탭 변경 핸들러
  const handleTabChange = (id: TabItem['id']) => setShowWritten(id === 'written');

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
          gatherings={eligibleGatherings}
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
            showToastMessage("방명록이 작성되었습니다.", 'check');
          }}
          onValidationFail={() => {
            showToastMessage("방명록 내용을 입력해주세요.", 'error');
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
            showToastMessage("방명록이 수정되었습니다.", 'check');
          }}
          onValidationFail={() => {
            showToastMessage("방명록 내용을 입력해주세요.", 'error');
          }}
        />
      )}

      {/* Toast 컴포넌트 */}
      <Toast
        isOpen={showToast}
        setIsOpen={setShowToast}
        type={toastType}
        message={toastMessage}
      />
    </div>
  );
}