import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
}

/**
 * useInfiniteScroll
 *
 * IntersectionObserver를 사용하여 무한 스크롤을 구현하는 커스텀 React 훅입니다.
 * 특정 요소가 화면에 진입했을 때(`onIntersect`) 콜백 함수가 실행됩니다.
 *
 * @param {Object} props - 훅의 설정 객체.
 * @param {() => void} props.onIntersect - 관찰 중인 요소가 화면에 들어왔을 때 호출되는 콜백 함수.
 * @param {boolean} props.isLoading - 데이터를 로딩 중인지 여부를 나타내는 플래그. `true`인 경우 콜백이 실행되지 않습니다.
 * @param {boolean} props.hasNextPage - 다음 페이지가 존재하는지 여부를 나타내는 플래그. `false`인 경우 콜백이 실행되지 않습니다.
 *
 * @returns {React.RefObject<HTMLDivElement>} 관찰할 요소에 할당할 React ref 객체를 반환합니다.
 *
 */

export default function useInfiniteScroll({
  onIntersect,
  isLoading,
  hasNextPage,
}: UseInfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasNextPage) {
          onIntersect();
        }
      },
      {
        threshold: 0.8,
        rootMargin: '100px',
      },
    );

    const currentTarget = observerRef.current;
    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      return undefined;
    };
  }, [onIntersect, isLoading, hasNextPage]);

  return observerRef;
}
