// components/guestbook/GuestbookModal.tsx
import { useState } from 'react';
import Modal from '@/components/dialog/Modal';
import Button from '@/components/common/Button';
import Heart from '@/components/common/Heart';
import ModalInput from '@/components/common/ModalInput';
import { GuestbookItem } from '@/types';

interface GuestbookModalProps {
  isEditMode: boolean;
  initialData?: GuestbookItem | null;
  gatheringId?: number;
  onSubmit: (data: { content: string; rating: number }) => void;
  onValidationFail: () => void;
  onClose: () => void;
}

export default function GuestbookModal({
  isEditMode,
  initialData,
  onSubmit,
  onValidationFail,
  onClose,
}: GuestbookModalProps) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      onValidationFail();
      return;
    }
    onSubmit({ content, rating }); // onClose 제거
  };

  return (
    <Modal title={isEditMode ? '방명록 수정' : '방명록 작성'} onClose={onClose}>
      <div className="w-[500px] h-[340px]">
        <form onSubmit={handleSubmit}>
          {/* 별점 선택 */}
          <div className="my-[20px] flex items-center gap-4">
            <Heart rating={rating} onChange={setRating} />
          </div>

          {/* 방명록 내용 입력 */}
          <ModalInput
            type="description"
            value={content}
            onChange={setContent}
            placeholder="방명록을 작성해주세요."
            maxLength={300}
            height="220px"
            onValidationFail={onValidationFail}
          />

          {/* 제출 버튼 */}
          <div className="mt-[20px]">
            <Button type="submit" name="작성하기" style="default" />
          </div>
        </form>
      </div>
    </Modal>
  );
}
