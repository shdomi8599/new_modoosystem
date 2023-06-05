import HeadTitle from "@/components/common/HeadTitle";
import styled from "styled-components";
import installStatuses from "@/dummy/installStatuses.json";

export default function HomePage() {
  console.log(installStatuses);
  return (
    <>
      <HeadTitle name="모두시스템" />
      <Box>dd</Box>
    </>
  );
}

const Box = styled.div`
  padding: 20px;
`;
