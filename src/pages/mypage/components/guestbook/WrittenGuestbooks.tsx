// components/guestbook/WrittenGuestbooks.tsx
import Null from "@/components/common/Null";
import GuestbookCard from "@/components/card/guestbook/GuestbookCard";
import { GatheringItem, GuestbookItem } from "@/types";

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
  if (guestbooks.length === 0) {
    return <Null message="아직 작성된 방명록이 없습니다." />;
  }

  return (
    <div className="space-y-6">
      {guestbooks.map((guestbook) => (
        <GuestbookCard
          key={guestbook.reviewId}
          guestbook={guestbook}
          gathering={gatherings.find(g => g.gatheringId === guestbook.gatheringId)}
          showActions={true}
          onEdit={onEditClick}
          onDelete={(guestbook) => console.log('delete clicked', guestbook)}
        />
      ))}
    </div>
  );
}