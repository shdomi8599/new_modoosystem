import { Button } from "antd";

import { confirmAlert } from "../alert/Alert";

const TableInstallButtonItem = ({ id }: { id: number }) => {
  const deleteEvent = () => {
    confirmAlert("정말 삭제하시겠습니까?", "설치현황 삭제가").then(() =>
      console.log(id)
    );
  };

  return (
    <Button disabled onClick={deleteEvent}>
      삭제
    </Button>
  );
};

export default TableInstallButtonItem;
