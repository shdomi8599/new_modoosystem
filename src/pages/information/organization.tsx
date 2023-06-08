import Image from "next/image";
import styled from "styled-components";
import organization from "@/public/organization/organization.jpg";
const OrganizationPage = () => {
  return (
    <Box>
      <Image width={800} src={organization} alt="organization" />
    </Box>
  );
};
export default OrganizationPage;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 320px;
  img {
    width: 100%;
    height: 100%;
  }
`;
