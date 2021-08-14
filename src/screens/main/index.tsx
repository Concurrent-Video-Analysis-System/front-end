import React from "react";
import styled from "@emotion/styled";
import { SurveillanceHeader } from "./header";
import { AsidePanel } from "./record/aside";
import { RecordListFragment } from "./record/recordlist";
import { useDocumentTitle } from "../../utils/document-title";
import { useForm } from "../../utils/form";
import { recordlistSlice } from "./recordlist.slice";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { DeviceIndexFragment } from "./device";

export const MainFragment = () => {
  useDocumentTitle("违规行为列表");
  const dispatch = useDispatch();

  return (
    <Container>
      <Header>
        <SurveillanceHeader />
      </Header>
      <Main>
        <Routes>
          <Route path={"recordlist/*"} element={<RecordListFragment />} />
          <Route path={"device/*"} element={<DeviceIndexFragment />} />
          <Navigate to={"recordlist"} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 5rem 1fr;
  grid-template-areas:
    "header"
    "main";
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
`;
const Main = styled.header`
  grid-area: main;
`;
