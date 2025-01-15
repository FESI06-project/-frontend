import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useMemberStore from '@/stores/useMemberStore';
import useLayoutStore from '@/stores/useLayoutStore';
import UserProfile from './UserProfile';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getMe from '@/pages/login/components/getMe';
import Loading from '../dialog/Loading';

export default function Navigation() {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path
      ? 'text-red-500 font-bold'
      : 'text-gray-300';
  };

  const {
    isLogin,
    nickname,
    setIsLogin,
    setMemberId,
    setNickname,
    setEmail,
    setProfileImageUrl,
  } = useMemberStore();
  const { toggleListExpanded } = useLayoutStore();

  const handleListButtonClick = () => {
    toggleListExpanded();
  };

  // 현재 로그인 정보 가져오는 useQuery
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: isLogin,
  });

  // 로그인 여부 확인해 사용자 정보 초기화
  useEffect(() => {
    const localIsLogin = localStorage.getItem('isLogin') === 'true';
    setIsLogin(localIsLogin);
    if (localIsLogin && data) {
      setMemberId(data.memberId);
      setNickname(data.nickName);
      setEmail(data.email);
      setProfileImageUrl(data.profileImageUrl);
    }
  }, [
    data,
    isLogin,
    setEmail,
    setIsLogin,
    setMemberId,
    setNickname,
    setProfileImageUrl,
  ]);

  // 에러 발생
  if (isError) {
    setIsLogin(false); // 에러가 발생하면 로그인 상태 초기화
    console.error('Error fetching user information:', error);
  }

  // 로딩 중
  if (isLoading) {
    return <Loading />;
  }

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
