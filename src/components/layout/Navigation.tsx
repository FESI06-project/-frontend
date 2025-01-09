import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useMemberStore from '@/stores/useMemberStore';
import useLayoutStore from '@/stores/useLayoutStore';
import UserProfile from './UserProfile';
import { useEffect } from 'react';

export default function Navigation() {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path
      ? 'text-red-500 font-bold'
      : 'text-gray-300';
  };

  const { isLogin, setIsLogin, setNickname, setMemberId, nickname } =
    useMemberStore();
  const { toggleListExpanded } = useLayoutStore();

  const handleListButtonClick = () => {
    toggleListExpanded();
  };

  useEffect(() => {
    const localIsLogin = localStorage.getItem('isLogin');
    setIsLogin(localIsLogin === 'true');
    if (localIsLogin === 'true') {
      const localMemberId = localStorage.getItem('memberId');
      const localNickname = localStorage.getItem('nickname');
      // console.log('localMemberId', localMemberId);
      // console.log('localNickname', localNickname);
      if (localNickname) {
        setNickname(localNickname);
      }
      if (localMemberId) {
        setMemberId(Number(localMemberId));
      }
    }
    // const localMemberId = localStorage.getItem('memberId');
    // const localNickname = localStorage.getItem('nickname');
    // console.log('localMemberId', localMemberId);
    // console.log('localNickname', localNickname);
    console.log('isLogin', useMemberStore.getState().isLogin);
    console.log('nickname', useMemberStore.getState().nickname);
    console.log('memberId', useMemberStore.getState().memberId);
  }, [isLogin, setIsLogin]);

  return (
    <header className=" top-0 left-0 w-full bg-dark-100 shadow-lg z-40 border-b-[1px] border-b-dark-300">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-20">
          {/* 로고 영역 */}
          <h1 className="flex flex-row items-center flex-shrink-0 mr-8">
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
            <Link href="/" className="text-red-500 font-bold text-2xl">
              FitMon
            </Link>
          </h1>

          {/* 메인 네비게이션 */}
          <nav className="hidden md:flex flex-1 items-center">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className={`${isActive('/')} hover:text-red-500 px-3 py-2 text-base font-semibold transition-colors`}
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
          </nav>

          {/* 사용자 프로필 영역 */}
          {isLogin ? (
            <>
              <UserProfile nickname={nickname} />
              <button
                onClick={() => {
                  localStorage.removeItem('isLogin');
                  localStorage.removeItem('email');
                  localStorage.removeItem('memberId');
                  localStorage.removeItem('nickname');
                  useMemberStore.getState().setIsLogin(false);
                  router.push('/');
                }}
              >
                {'로그아웃'}
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="sm:w-[124px] sm:h-[42px] w-[100px] h-[34px] rounded-[10px] text-base bg-primary text-white"
            >
              {'로그인'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
