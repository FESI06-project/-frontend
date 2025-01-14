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
}

export default function GuestbookModal({
  isEditMode,
  initialData,
  onSubmit,
  onValidationFail
}: GuestbookModalProps) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      onValidationFail();
      return;
    }
    onSubmit({ content, rating });
  };

  return (
    <Modal title={isEditMode ? "방명록 수정" : "방명록 작성"}>
      <div className="w-[500px] h-[300px] p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center gap-4">
            <Heart rating={rating} />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="px-2 py-1 text-white hover:text-primary"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <ModalInput
            type="description"
            value={content}
            onChange={setContent}
            placeholder="방명록을 작성해주세요."
            maxLength={300}
            height="225px"
            onValidationFail={onValidationFail}
          />
          <div className="mt-4">
            <Button
              type="submit"
              name="확인"
              style="default"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}