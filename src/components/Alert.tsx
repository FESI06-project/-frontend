import React from 'react';

export interface AlertProps {
  isOpen: boolean;
  type: 'select' | 'confirm'; // 알림 유형: 'select'는 취소/확인 버튼, 'confirm'은 확인 버튼만
  message: string; // 알림 메시지
  onConfirm: () => void; // 확인 버튼 동작
  onCancel?: () => void; // 취소 버튼 동작 (선택 사항)
}

export default function Alert({
  isOpen,
  type = 'confirm',
  message,
  onConfirm,
  onCancel,
}: AlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="h-[178px] w-[380px] rounded-2xl bg-dark-300 px-[30px] py-[35px] flex flex-col justify-between items-center">
        {/* 메시지 */}
        <p className="text-center text-lg text-white">
          {message}
        </p>

        {/* 버튼 영역 */}
        <div
          className={`w-full flex ${
            type === 'select' ? 'justify-between' : 'justify-center'
          } gap-3`}
        >
          {type === 'select' && (
            <button
              onClick={onCancel}
              className="w-[156px] h-[48px] rounded-lg bg-dark-700 text-white text-lg"
            >
              취소
            </button>
          )}
          <button
            onClick={onConfirm}
            className="w-[156px] h-[48px] rounded-lg bg-primary text-white text-lg"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}