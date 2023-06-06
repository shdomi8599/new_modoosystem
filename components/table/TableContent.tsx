import { Pagination, Table, Button } from "antd";
import { TableColumn } from "@/types";
import styled from "styled-components";
import { Announcement } from "@/types/pageData";
import { useRouter } from "next/router";

type Props<T> = {
  dataSource: T[];
  columns: TableColumn[];
  page: number;
  size: number;
  handlePageChange: (page: number, size: number) => void;
  totalElements: number;
};

const TableContent = <T extends Announcement>({
  page,
  size,
  handlePageChange,
  dataSource,
  columns,
  totalElements,
}: Props<T>) => {
  const router = useRouter();
  const { asPath } = router;
  const isBtn = asPath === "/service/board";
  const moveCreate = () => {
    router.push(`${asPath}/create`);
  };
  return (
    <Box>
      {isBtn && (
        <div className="btn-box">
          <Button onClick={moveCreate}>글쓰기</Button>
        </div>
      )}
      <Table
        className="table"
        style={{ width: "100%" }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <Pagination
        className="pagination"
        current={page}
        pageSize={size}
        onChange={handlePageChange}
        total={totalElements}
      />
    </Box>
  );
};
export default TableContent;

const Box = styled.div`
  padding: 40px 0px;
  width: 90%;
  position: relative;

  .btn-box {
    position: absolute;
    top: -4px;
    right: 0px;
  }

  .table {
    margin-bottom: 40px;
    min-height: 605px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
  }
  thead {
    th:first-child {
      text-align: center;
    }
  }
  td:first-child {
    text-align: center;
  }
`;
