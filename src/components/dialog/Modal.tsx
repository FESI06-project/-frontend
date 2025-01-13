import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void; // 모달을 닫는 핸들러는 필수로 전달받음
}

export default function Modal({ children, title, onClose }: ModalProps) {
  const handleClose = () => {
    onClose(); // 모달 닫기 핸들러 호출
  };

  return createPortal(
    <div>
      {/* 모달 배경 */}
      <div
        onClick={handleClose}
        className="bg-black/50 w-screen h-screen z-[10000] left-0 top-0 absolute flex items-center justify-center"
      >
        {/* 모달 콘텐츠 */}
        <div
          onClick={(e) => e.stopPropagation()} // 클릭 이벤트 버블링 방지
          style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
          className="bg-dark-300 rounded-[10px] px-[30px] py-[35px]"
        >
          {/* 모달 헤더 */}
          <div className="z-[10003] flex items-center justify-between">
            <p className="text-xl font-bold">{title}</p>
            <Image
              className="cursor-pointer"
              onClick={handleClose}
              src="/assets/image/modal-close.svg"
              width={24}
              height={24}
              alt="modal-close"
            />
          </div>
          {/* 모달 내용 */}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('aside-root')!, // `aside-root`에 모달 렌더링
  );
}
