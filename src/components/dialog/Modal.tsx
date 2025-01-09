import useModalStore from '@/stores/useModalStore';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  title: string;
}
export default function Modal({ children, title }: ModalProps) {
  const { showModal, setShowModal } = useModalStore();

  return createPortal(
    <div>
      <div
        onClick={() => setShowModal(!showModal)}
        className="bg-black/50 w-screen h-screen z-[10000] left-0 top-0 absolute flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
          className=" bg-dark-300 rounded-[10px] px-[30px] py-[35px] "
        >
          <div className="z-[10003] flex items-center justify-center">
            <p className="absolute text-xl font-bold z-[10004]">{title}</p>
            <div className="w-full relative flex justify-between">
              <div></div>
              <Image
                className="relative  z-[10005]"
                onClick={() => setShowModal(!showModal)}
                src="/assets/image/modal-close.svg"
                width={24}
                height={24}
                alt="modal-close"
              />
            </div>
          </div>

          <div className="z-[10002] ">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('aside-root')!,
  );
}
