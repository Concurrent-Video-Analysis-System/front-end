import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BaseRoute } from "./components/router";
import { useAuthContext } from "./contexts/authorize";
import { MainPageFrame } from "./screens/main";
import { AuthorizeFragment } from "./screens/authorize";
import { DashBoardPage } from "./screens/main/dashboard";
import { RecordIndexPage } from "./screens/main/record";
import { AssetPageFrame } from "./screens/main/device";
import { TaskIndexPage } from "./screens/main/task";
import { TaskDetailPage } from "./screens/main/task/task-detail";
import { RecordHandlingPage } from "./screens/main/record/handle";
import { AssetOverviewPage } from "./screens/main/device/overview";
import { LocationPage } from "./screens/main/device/location";
import { DevicePage } from "./screens/main/device/device";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <Routes>
          <Route path={"/"} element={<MainPageFrame />}>
            <Route path={"dashboard"} element={<DashBoardPage />} />
            <BaseRoute path={"record"} element={<RecordIndexPage />}>
              <Route path={":recordId"} element={<RecordHandlingPage />} />
            </BaseRoute>
            <AssetPageFrame>
              <BaseRoute path={"asset"} element={<>123123123</>}>
                <BaseRoute path={"location"} element={<AssetOverviewPage />}>
                  <Route path={":locationId"} element={<LocationPage />} />
                </BaseRoute>
                <BaseRoute path={"nvr"} element={<AssetOverviewPage />}>
                  <Route path={":nvrId"} element={<DevicePage />} />
                </BaseRoute>
                <BaseRoute path={"device"} element={<AssetOverviewPage />}>
                  <Route path={":deviceId"} element={<DevicePage />} />
                </BaseRoute>
              </BaseRoute>
            </AssetPageFrame>
            <BaseRoute path={"task"} element={<TaskIndexPage />}>
              <Route path={":taskId"} element={<TaskDetailPage />} />
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
