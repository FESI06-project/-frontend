import useLayoutStore from '@/stores/useLayoutStore';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SideBar() {
  const { isListExpanded } = useLayoutStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sideBarContents = ['모임 찾기', '찜한 모임', '모든 방명록'];
  const mypageContents = ['마이페이지', '로그아웃'];
  const isActive = (isActive: boolean) => {
    if (isActive) {
      return `text-primary flex items-center text-lg w-[67vw] h-[50px] p-[15px] bg-dark-300 rounded-[10px]`;
    }
    return `text-white flex items-center text-lg w-[67vw] h-[50px] p-[15px]`;
  };

  return (
    <>
      {isListExpanded && (
        <div className="fixed flex flex-col top-0 left-0 px-5 h-screen bg-dark-200 z-50">
          <Image
            src="/assets/image/close.svg"
            alt="close"
            width={24}
            height={24}
            className="mt-6 mb-9"
          />
          <Link href="/" className="text-red-500 font-bold text-2xl mb-[30px]">
            FitMon
          </Link>
          <ul className="flex flex-col gap-y-4 justify-center">
            {sideBarContents.map((content, index) => (
              <li
                key={index}
                className={`${isActive(index === selectedIndex)}`}
                onClick={() => setSelectedIndex(index)}
              >
                {content}
              </li>
            ))}
          </ul>
          <p className="text-white text-sm mt-[50px] ml-[3px] mb-5">
            {'MYPAGE'}
          </p>
          <ul className="flex flex-col gap-y-4 justify-center">
            {mypageContents.map((content, index) => (
              <li
                key={index}
                className={`${isActive(index + 3 === selectedIndex)}`}
                onClick={() => setSelectedIndex(index + 3)}
              >
                {content}
                {index === 1 && (
                  <Image
                    className="ml-2"
                    src={`${index + 3 === selectedIndex ? '/assets/image/logout-primary.svg' : '/assets/image/logout.svg'}`}
                    alt="logout button"
                    width={16}
                    height={16}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
