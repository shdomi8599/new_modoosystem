import { Pagination, Table, Button, Input, Select, Form } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";

import { TableColumn } from "@/types";
import { SELECT_SEARCH_ITEMS } from "@/datas/constants/constants";
import useSearch from "@/hooks/useSearch";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

type Props<T> = {
  dataSource: T[];
  columns: TableColumn[];
  page: number;
  size: number;
  handlePageChange: (page: number, size: number) => void;
  totalElements: number;
};

const TableContent = <T extends object>({
  page,
  size,
  handlePageChange,
  dataSource,
  columns,
  totalElements,
}: Props<T>) => {
  const { setSearch } = useSearch();
  const router = useRouter();
  const { asPath } = router;
  const isBtn = asPath === "/service/boards";
  const moveCreate = () => {
    router.push(`${asPath}/create`);
  };
  const [form] = Form.useForm();
  const onFinish = (values: { category: string; searchVal: string }) => {
    setSearch(values);
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
      <div className="bottom">
        <Form
          initialValues={{
            ["category"]: "title",
          }}
          form={form}
          {...layout}
          name="control-hooks"
          className="search-box"
          onFinish={onFinish}
        >
          <Form.Item name="category">
            <Select className="select" options={SELECT_SEARCH_ITEMS} />
          </Form.Item>
          <Form.Item
            name="searchVal"
            rules={[
              {
                required: true,
                message: "검색어를 입력해주세요.",
              },
            ]}
          >
            <Input className="input" placeholder="검색어" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              확인
            </Button>
          </Form.Item>
        </Form>
        <Pagination
          className="pagination"
          current={page}
          pageSize={size}
          onChange={handlePageChange}
          total={totalElements}
        />
      </div>
    </Box>
  );
};
export default TableContent;

const Box = styled.div`
  padding: 40px 0px;
  width: 90%;
  position: relative;
  .bottom {
    display: flex;
    justify-content: space-between;
    @media (max-width: 640px) {
      flex-direction: column;
      gap: 16px;
    }
    .search-box {
      display: flex;
      gap: 8px;
      @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        .ant-form-item {
          margin-bottom: 4px;
        }
      }
      .select {
        min-width: 100px;
      }
      .input {
        min-width: 184px;
      }
      .ant-form-item-explain-error {
        min-width: 184px;
      }
    }
  }

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
