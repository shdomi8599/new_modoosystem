import { useEffect, useRef } from "react";
import { InfiniteData } from "react-query";

interface Props<T> {
  hasNextPage?: boolean;
  data?: InfiniteData<{ data: T[]; totalElements: number }>;
  fetchNextPage: () => void;
}

const useIntersectionObserver = <T,>({
  hasNextPage,
  fetchNextPage,
  data,
}: Props<T>) => {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (target.current && !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [data, fetchNextPage, hasNextPage]);

  return {
    target,
  };
};

export default useIntersectionObserver;
