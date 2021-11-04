import React from "react";
import "./App.css";
import { useAuthContext } from "./contexts/authorize";
import { MainFragment } from "./screens/main";
import { AuthorizeFragment } from "./screens/authorize";
import { Outlet, Route, Routes } from "react-router-dom";
import { DashBoard } from "./screens/main/dashboard";
import { RecordIndexFragment } from "./screens/main/record";
import { DeviceIndexFragment } from "./screens/main/device";
import { TaskIndexFragment } from "./screens/main/task";
import { Navigate } from "react-router";
import { TaskDetailFragment } from "./screens/main/task/task-detail";
import { LoginFragment } from "./screens/authorize/login";
import { RecordHandlingFragment } from "./screens/main/record/handle";
import { BaseRoute } from "./components/router";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <Routes>
          <Route path={"/"} element={<MainFragment />}>
            <Route path={"dashboard"} element={<DashBoard />} />
            <BaseRoute path={"record"} element={<RecordIndexFragment />}>
              <Route path={":recordId"} element={<RecordHandlingFragment />} />
            </BaseRoute>
            <Route path={"device"} element={<DeviceIndexFragment />} />
            <BaseRoute path={"task"} element={<TaskIndexFragment />}>
              <Route path={":taskId"} element={<TaskDetailFragment />} />
            </BaseRoute>
            <Route path={"*"} element={<></>} />
          </Route>
        </Routes>
      ) : (
        <AuthorizeFragment />
      )}
    </>
  );

  // return user ? <MainFragment /> : <AuthorizeFragment />;
}

export default App;
