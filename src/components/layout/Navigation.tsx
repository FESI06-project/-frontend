import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useMemberStore from '@/stores/useMemberStore';
import useLayoutStore from '@/stores/useLayoutStore';
import UserProfile from './UserProfile';

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
    <nav className="sticky top-0 left-0 w-full bg-dark-100 shadow-lg z-40">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
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
                className={`${isActive('/meeting')} hover:text-red-500 px-3 py-2 text-base font-semibold transition-colors`}
              >
                모임 찾기
              </Link>
              <Link
                href="/popular"
                className={`${isActive('/popular')} hover:text-red-500 px-3 py-2 text-semibold font-medium transition-colors`}
              >
                평한 모임
              </Link>
              <Link
                href="/all"
                className={`${isActive('/all')} hover:text-red-500 px-3 py-2 text-semibold font-medium transition-colors`}
              >
                모든 방명록
              </Link>
            </div>
          </div>

          {/* 사용자 프로필 영역 */}
          {isLogin ? (
            <UserProfile nickname={nickname} />
          ) : (
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="sm:w-[124px] sm:h-[42px] w-[100px] h-[34px] rounded-[10px] text-base bg-primary text-white"
            >
              {'로그인'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
