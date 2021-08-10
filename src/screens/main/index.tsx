import React from "react";
import styled from "@emotion/styled";
import { SurveillanceHeader } from "./header";
import { AsidePanel } from "./aside";
import { RecordListFragment } from "./record/recordlist";
import { useDocumentTitle } from "../../utils/document-title";
import { useForm } from "../../utils/form";
import { recordlistSlice } from "./recordlist.slice";
import { useDispatch } from "react-redux";

export const MainFragment = () => {
  useDocumentTitle("违规行为列表");
  const dispatch = useDispatch();

  const { setPartialProps, reload } = useForm(
    {
      type: undefined,
      location: undefined,
      reason: undefined,
      from: undefined,
      to: undefined,
    },
    "recordlist",
    (data) => {
      dispatch(recordlistSlice.actions.set(data));
    }
  );

  return (
    <Container>
      <Header>
        <SurveillanceHeader />
      </Header>
      <Main>
        <Routes>
          <Route path={"recordlist/*"} element={<RecordListFragment />} />
          <Route path={"device/*"} element={<DeviceFragment />} />
          <Navigate to={"recordlist"} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 5rem 1fr;
  grid-template-columns: 26rem 1fr;
  grid-template-areas:
    "header header"
    "aside main";
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
`;
const Main = styled.header`
  grid-area: main;
`;
const Aside = styled.header`
  grid-area: aside;
  overflow: hidden auto;
`;
