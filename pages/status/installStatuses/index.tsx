import { useEffect, useRef } from "react";
import styled from "styled-components";
import useInfinite from "@/hooks/useInfinite";

const endPoint = "installStatuses";
const page_limit = 4;

const InstallationPage = () => {
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfinite(endPoint, page_limit);

  //무한 스크롤 effect
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
  }, [target.current, data?.pageParams]);

  return (
    <Box>
      <div></div>
      <div ref={target} className="observer"></div>
    </Box>
  );
};
export default InstallationPage;

const Box = styled.div``;
