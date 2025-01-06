import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useMemberStore from '@/stores/useMemberStore';
import useLayoutStore from '@/stores/useLayoutStore';

export default function Navigation() {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path
      ? 'text-red-500 font-bold'
      : 'text-gray-300';
  };

  const { isLogin, setIsLogin, nickname } = useMemberStore();
  const { toggleListExpanded } = useLayoutStore();

  const handleListButtonClick = () => {
    toggleListExpanded();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 영역 */}
          <div className="flex flex-row items-center flex-shrink-0 mr-8">
            {' '}
            {/* 오른쪽 여백 추가 */}
            <div className="flex md:hidden">
              <Image
                alt="list button"
                onClick={handleListButtonClick}
                src="/assets/image/list.svg"
                width="23"
                height="20"
              />
            </div>
            <Link href="/" className="text-red-500 font-bold text-2xl ml-6">
              FitMon
            </Link>
          </div>

          {/* 메인 네비게이션 */}
          <div className="hidden md:flex flex-1 items-center">
            <div className="flex items-center space-x-8">
              <Link
                href="/meeting"
                className={`${isActive('/meeting')} hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors`}
              >
                모임 찾기
              </Link>
              <Link
                href="/popular"
                className={`${isActive('/popular')} hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors`}
              >
                평한 모임
              </Link>
              <Link
                href="/all"
                className={`${isActive('/all')} hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors`}
              >
                모든 방명록
              </Link>
            </div>
          </div>

          {/* 사용자 프로필 영역 */}
          {isLogin ? (
            <>
              <div className="flex items-center">
                <div className="flex items-center ml-4">
                  <div className="mr-3">
                    <button
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg
                          className="h-5 w-5 text-gray-300"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="hidden md:flex items-center text-gray-300 text-sm">
                    {nickname}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-[100px] h-[34px] rounded-[10px] bg-primary text-white"
            >
              {'로그인'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
