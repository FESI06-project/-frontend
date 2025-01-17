import { useState } from 'react';
import Null from '@/components/common/Null';
import GuestbookCard from '@/components/card/guestbook/GuestbookCard';
import { GatheringItem, GuestbookItem } from '@/types';
import Alert from '@/components/dialog/Alert';
import useToastStore from '@/stores/useToastStore';
import useGuestbookStore from '@/stores/useGuestbookStore';

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
    selectedGuestbook: null as GuestbookItem | null,
  });
  
  const showToast = useToastStore((state) => state.show);
  const { deleteGuestbook } = useGuestbookStore();

  const updateState = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  if (guestbooks.length === 0) {
    return <Null message="아직 작성된 방명록이 없습니다." />;
  }

  const handleDeleteClick = (guestbook: GuestbookItem) => {
    updateState({ selectedGuestbook: guestbook, showDeleteAlert: true });
  };

  const handleDeleteConfirm = async () => {
    if (state.selectedGuestbook) {
      try {
        await deleteGuestbook(
          state.selectedGuestbook.gatheringId,
          state.selectedGuestbook.reviewId
        );
        showToast('삭제가 완료되었습니다.', 'check');
      } catch {
        showToast('삭제에 실패했습니다.', 'error');
      }
    }
    setState((prev) => ({ ...prev, showDeleteAlert: false, selectedGuestbook: null }));
  };

  const handleDeleteCancel = () => {
    setState((prev) => ({ ...prev, showDeleteAlert: false, selectedGuestbook: null }));
    showToast('삭제가 취소되었습니다.', 'caution');
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
    </div>
  );
}