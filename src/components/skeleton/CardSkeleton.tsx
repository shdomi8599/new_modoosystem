import styled from "styled-components";

import Skeleton from "./Skeleton";

const CardSkeleton = ({ size }: { size: number }) => {
  const skeletonLength = Array(size).fill(1);

  return (
    <>
      {skeletonLength.map((_: 1, idx) => (
        <Box key={idx}>
          <Skeleton width={"240px"} height={"160px"} />
          <Skeleton width={"240px"} height={"60px"} />
        </Box>
      ))}
    </>
  );
};

export default CardSkeleton;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
