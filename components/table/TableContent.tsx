import { Pagination, Table } from "antd";
import { TableColumn } from "@/types";
import styled from "styled-components";
import { Announcement } from "@/types/pageData";

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
  return (
    <Box>
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
