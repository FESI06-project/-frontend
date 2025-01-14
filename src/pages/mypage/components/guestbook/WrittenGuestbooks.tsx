import { useState } from 'react';
import Null from '@/components/common/Null';
import GuestbookCard from '@/components/card/guestbook/GuestbookCard';
import { GatheringItem, GuestbookItem } from '@/types';
import Alert from '@/components/dialog/Alert';
import Toast from '@/components/dialog/Toast';

interface WrittenGuestbooksProps {
  guestbooks: GuestbookItem[];
  gatherings: GatheringItem[];
  onEditClick: (guestbook: GuestbookItem) => void;
}

export default function WrittenGuestbooks({
  guestbooks,
  gatherings,
  onEditClick,
}: WrittenGuestbooksProps) {
  const [state, setState] = useState({
    showDeleteAlert: false,
    showToast: false,
    toastMessage: '',
    toastType: 'check' as 'check' | 'caution',
    selectedGuestbook: null as GuestbookItem | null,
  });

  const updateState = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  if (guestbooks.length === 0) {
    return <Null message="아직 작성된 방명록이 없습니다." />;
  }

  const handleDeleteClick = (guestbook: GuestbookItem) => {
    updateState({ selectedGuestbook: guestbook, showDeleteAlert: true });
  };

  const handleDeleteConfirm = () => {
    updateState({
      showDeleteAlert: false,
      showToast: true,
      toastMessage: '삭제가 완료되었습니다.',
      toastType: 'check',
      selectedGuestbook: null,
    });
    // TODO: API 호출 로직 추가
  };

  const handleDeleteCancel = () => {
    updateState({
      showDeleteAlert: false,
      showToast: true,
      toastMessage: '삭제가 취소되었습니다.',
      toastType: 'caution',
      selectedGuestbook: null,
    });
  };

  return (
    <div className="space-y-6">
      {guestbooks.map((guestbook) => (
        <GuestbookCard
          key={guestbook.reviewId}
          guestbook={guestbook}
          gathering={gatherings.find((g) => g.gatheringId === guestbook.gatheringId)}
          showActions={true}
          onEdit={onEditClick}
          onDelete={() => handleDeleteClick(guestbook)}
        />
      ))}

      <Alert
        isOpen={state.showDeleteAlert}
        type="select"
        message="정말 삭제하시겠습니까?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <Toast
        isOpen={state.showToast}
        setIsOpen={(value) => updateState({ showToast: value })}
        type={state.toastType}
        message={state.toastMessage}
      />
    </div>
  );
}
