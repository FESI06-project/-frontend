import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
}

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
