// components/common/GuestbookCard.tsx
import Heart from "@/components/common/Heart";
import Popover from "@/components/common/Popover";
import { GatheringItem, GuestbookItem } from "@/types";
import Image from 'next/image';

interface GuestbookCardProps {
  guestbook: GuestbookItem;
  gathering?: GatheringItem;
  showActions?: boolean;  // 팝오버 표시 여부
  onEdit?: (guestbook: GuestbookItem) => void;
  onDelete?: (guestbook: GuestbookItem) => void;
}

export default function GuestbookCard({
  guestbook,
  gathering,
  showActions = false,
  onEdit,
  onDelete
}: GuestbookCardProps) {
  return (
    <div className="flex gap-[30px] bg-dark-900 rounded-lg">
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
          {showActions && onEdit && onDelete && (
            <Popover
              type="dot"
              items={[
                {
                  id: 'edit',
                  label: '수정하기',
                  onClick: () => onEdit(guestbook)
                },
                {
                  id: 'delete',
                  label: '삭제하기',
                  onClick: () => onDelete(guestbook)
                }
              ]}
            />
          )}
        </div>

        <p className="mb-4 break-all line-clamp-4">
          {guestbook.content}
        </p>

        {gathering && (
          <div className="flex items-end justify-between">
            <p className="text-primary font-normal">
              {gathering.gatheringTitle} |
              {gathering.gatheringSi}
              {gathering.gatheringGu}
            </p>
            <p className="text-dark-700 font-medium">
              {gathering.gatheringStartDate} ~ {gathering.gatheringEndDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}