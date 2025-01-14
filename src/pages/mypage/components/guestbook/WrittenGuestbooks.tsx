// components/guestbook/WrittenGuestbooks.tsx
import { useState } from 'react';
import Null from "@/components/common/Null";
import GuestbookCard from "@/components/card/guestbook/GuestbookCard";
import { GatheringItem, GuestbookItem } from "@/types";
import Alert from "@/components/dialog/Alert";
import Toast from "@/components/dialog/Toast";

interface WrittenGuestbooksProps {
  guestbooks: GuestbookItem[];
  gatherings: GatheringItem[];
  onEditClick: (guestbook: GuestbookItem) => void;
}

export default function WrittenGuestbooks({
  guestbooks,
  gatherings,
  onEditClick
}: WrittenGuestbooksProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [, setSelectedGuestbook] = useState<GuestbookItem | null>(null);

  if (guestbooks.length === 0) {
    return <Null message="아직 작성된 방명록이 없습니다." />;
  }

  const handleDeleteClick = (guestbook: GuestbookItem) => {
    setSelectedGuestbook(guestbook);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteAlert(false);
    setToastMessage("삭제가 완료되었습니다.");
    setShowToast(true);
    setSelectedGuestbook(null);
    // TODO: API 호출 로직 추가
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    setToastMessage("삭제가 취소되었습니다.");
    setShowToast(true);
    setSelectedGuestbook(null);
  };

  return (
    <div className="space-y-6">
      {guestbooks.map((guestbook) => (
        <GuestbookCard
          key={guestbook.reviewId}
          guestbook={guestbook}
          gathering={gatherings.find(g => g.gatheringId === guestbook.gatheringId)}
          showActions={true}
          onEdit={onEditClick}
          onDelete={handleDeleteClick}
        />
      ))}

      <Alert
        isOpen={showDeleteAlert}
        type="select"
        message="정말 삭제하시겠습니까?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <Toast
        isOpen={showToast}
        setIsOpen={setShowToast}
        type={showDeleteAlert ? 'check' : 'caution'}  
        message={toastMessage}
      />
    </div>
  );
}