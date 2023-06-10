import { Button } from "antd";

const TableInstallButtonItem = ({ id }: { id: number }) => {
  const deleteEvent = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      console.log(id);
    }
  };
  return <Button onClick={deleteEvent}>삭제</Button>;
};

export default TableInstallButtonItem;
