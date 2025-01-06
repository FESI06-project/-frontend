import useLayoutStore from '@/stores/useLayoutStore';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SideBar() {
  const { isListExpanded, toggleListExpanded } = useLayoutStore();
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
        <>
          {/* 배경을 누르면 리스트를 닫기 위한 div 요소 */}
          <div
            className="fixed flex w-screen h-screen z-[45]"
            onClick={() => toggleListExpanded()}
          >
            {/* 사이드바 */}
            <div
              className="fixed flex flex-col top-0 left-0 px-5 h-screen bg-dark-200 z-50 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <Image
                src="/assets/image/close.svg"
                alt="close"
                width={24}
                height={24}
                className="mt-6 mb-9"
                onClick={() => toggleListExpanded()}
              />
              {/* FitMon 로고 */}
              <Link
                href="/"
                className="text-red-500 font-bold text-2xl mb-[30px]"
              >
                FitMon
              </Link>
              {/* 네비게이션 요소 */}
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
              {/* 마이페이지 요소 */}
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
                    {/* 로그아웃 이미지 */}
                    {content === '로그아웃' && (
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
          </div>
        </>
      )}
    </>
  );
}
