import styled from "styled-components";
import { Collapse } from "antd";

import { DEPARTMENTS } from "@/datas/constants/constants";

const { Panel } = Collapse;

const OrganizationPage = () => {
  return (
    <Box>
      <Collapse defaultActiveKey={["대표이사"]}>
        <Panel header="대표이사" key="대표이사">
          <p>회사의 경영과 전략을 총괄하는 역할을 맡습니다.</p>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={DEPARTMENTS.map((department) => department.key)}
      >
        {DEPARTMENTS.map(({ name, key, subDepartments }) => (
          <Panel header={name} key={key}>
            <Collapse defaultActiveKey={[]}>
              {subDepartments.map((subDepartment) => (
                <Panel header={subDepartment.name} key={subDepartment.name}>
                  <p>{subDepartment.content}</p>
                </Panel>
              ))}
            </Collapse>
          </Panel>
        ))}
      </Collapse>
    </Box>
  );
};
export default OrganizationPage;

const Box = styled.div`
  margin: 40px 0px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 90%;
`;
