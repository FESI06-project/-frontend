import { useState } from 'react';
import type { GuestbookItem } from '@/types';

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: GuestbookItem;
}

export default function GuestbookModal({
  isOpen,
  onClose,
  initialData
}: GuestbookModalProps) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">방명록 작성</h2>
          <button onClick={onClose} className="text-dark-500">✕</button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">별점</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onMouseEnter={() => setHoveredRating(num)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(num)}
                className={`text-2xl transition-colors ${
                  num <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-200'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {rating > 0 ? `${rating}점을 선택하셨습니다` : '별점을 선택해주세요'}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">내용</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
            defaultValue={initialData?.content}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white bg-primary rounded hover:bg-opacity-90"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}