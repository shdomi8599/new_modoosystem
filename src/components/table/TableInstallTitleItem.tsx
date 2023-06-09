import styled from "styled-components";
import { useRouter } from "next/router";

interface Props {
  id: number;
  title: string;
}

const TableInstallTitleItem = ({ title, id }: Props) => {
  const router = useRouter();

  const moveViewInstall = () => {
    router.push(`/admin/installStatuses/${id}`);
  };
  
  return <Box onClick={moveViewInstall}>{title}</Box>;
};

export default TableInstallTitleItem;

const Box = styled.div`
  cursor: pointer;
`;
