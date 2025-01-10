import { useState } from 'react';
import GuestbookModal from './GuestbookModal';
import { GuestbookItem } from '@/types';
interface GuestbookTabProps {
  guestbooks?: GuestbookItem[]; // optional로 변경
}

export default function GuestbookTab({ guestbooks = [] }: GuestbookTabProps) {
  const [showWritten, setShowWritten] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGuestbook, setSelectedGuestbook] =
    useState<GuestbookItem | null>(null);

  const handleEditClick = (guestbook: GuestbookItem) => {
    setSelectedGuestbook(guestbook);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setShowWritten(true)}
            className={`px-4 py-2 rounded ${
              showWritten ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            작성한 방명록
          </button>
          <button
            onClick={() => setShowWritten(false)}
            className={`px-4 py-2 rounded ${
              !showWritten ? 'bg-primary text-white' : 'bg-gray-100 text-black'
            }`}
          >
            작성 가능한 방명록
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {(guestbooks || []).map((guestbook) => (
          <div
            key={guestbook.reviewId}
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-dark-700">
                {guestbook.content}
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-xl ${
                        index < guestbook.rating
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleEditClick(guestbook)}
                  className="text-sm px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  수정
                </button>
              </div>
            </div>
            <p className="text-dark-600 mb-3 leading-relaxed">
              {guestbook.content}
            </p>
            <div className="text-sm text-dark-500">
              {new Date(guestbook.createDate).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        ))}
      </div>

      <GuestbookModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedGuestbook(null);
        }}
        initialData={selectedGuestbook || undefined}
      />
    </div>
  );
}
