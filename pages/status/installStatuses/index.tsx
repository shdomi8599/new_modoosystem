import { InstallStatus } from "@/types/pageData";
import { getPageData } from "@/util/api";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
const endPoint = "installStatuses";
const page_limit = 4;

type PageProps = { data: InstallStatus[]; totalElements: number };

const InstallationPage = () => {
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      endPoint,
      async ({ pageParam = 1 }) =>
        getPageData<InstallStatus>(endPoint, pageParam, page_limit),
      {
        getNextPageParam: (lastPage: PageProps, allPages: PageProps[]) => {
          console.log(allPages);
          console.log(lastPage);
          if (lastPage.data.length < page_limit) {
            return null;
          }
          return allPages.length + 1;
        },
      }
    );

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
