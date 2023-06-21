import styled from "styled-components";
import { memo } from "react";

import { SkeletonProos } from "@/types";

const Skeleton = (props: SkeletonProos) => <SkeletonContainer {...props} />;

const SkeletonContainer = styled.div<SkeletonProos>`
  position: relative;
  overflow: hidden;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-color: #f3f3f3;
  border-radius: 15px;

  @keyframes skeleton {
    0% {
      background-color: rgba(164, 164, 164, 0.1);
    }
    50% {
      background-color: rgba(164, 164, 164, 0.3);
    }
    100% {
      background-color: rgba(164, 164, 164, 0.1);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton 1.6s infinite ease-in-out;
  }
`;

export default memo(Skeleton);
