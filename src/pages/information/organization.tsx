import styled from "styled-components";
import { Collapse } from "antd";
import { DEPARTMENTS } from "@/datas/constants/constants";

const { Panel } = Collapse;

const OrganizationPage = () => {
  return (
    <Box>
      <Collapse defaultActiveKey={["대표이사"]}>
        <Panel header="대표이사" key="대표이사">
          <p>대표이사</p>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={DEPARTMENTS.map((department) => department.key)}
      >
        {DEPARTMENTS.map((department) => (
          <Panel header={department.name} key={department.key}>
            <Collapse defaultActiveKey={[]}>
              {department.subDepartments.map((subDepartment) => (
                <Panel header={subDepartment.name} key={subDepartment.key}>
                  <p>{subDepartment.name}</p>
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
