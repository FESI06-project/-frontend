import React from 'react';

interface PreparingProps {
  message?: string;
  isVisible: boolean; // 준비중 상태 제어
}

export default function Preparing({ message = "준비중입니다...", isVisible }: PreparingProps) {
  if (!isVisible) return null; // 상태에 따라 렌더링 여부 결정

  return (
    <div className="absolute inset-0 z-50 w-full h-full bg-black/60 flex flex-col items-center justify-center">
      <div className="relative w-40 h-40">
        <img
          src="/assets/image/fitmon.png"
          alt="Loading animation"
          className="w-full h-full animate-bounce"
        />
      </div>
      <span className="text-white font-bold text-lg mt-4">{message}</span>
    </div>
  );
}
