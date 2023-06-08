import styled from "styled-components";
import { Collapse } from "antd";

const { Panel } = Collapse;

const OrganizationPage = () => {
  return (
    <Box>
      <Collapse defaultActiveKey={["대표이사"]}>
        <Panel header="대표이사" key="대표이사">
          <p>대표이사</p>
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={["관리부", "영업부", "기술부"]}>
        <Panel header="관리부" key="관리부">
          <Collapse defaultActiveKey={[]}>
            <Panel header="총무팀" key="총무팀">
              <p>총무팀</p>
            </Panel>
            <Panel header="회계팀" key="회계팀">
              <p>회계팀</p>
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="영업부" key="영업부">
          <Collapse defaultActiveKey={[]}>
            <Panel header="영업1팀" key="영업1팀">
              <p>영업1팀</p>
            </Panel>
            <Panel header="영업2팀" key="영업2팀">
              <p>영업2팀</p>
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="기술부" key="기술부">
          <Collapse defaultActiveKey={[]}>
            <Panel header="시공팀" key="시공팀">
              <p>시공팀</p>
            </Panel>
            <Panel header="연구개발팀" key="연구개발팀">
              <p>연구개발팀</p>
            </Panel>
          </Collapse>
        </Panel>
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
