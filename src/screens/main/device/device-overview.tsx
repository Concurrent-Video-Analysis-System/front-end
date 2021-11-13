import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { TagList } from "./create-task";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { AssetTemplate } from "./asset-template";

export const DeviceOverviewPage = () => {
  const navigate = useNavigate();
  const { deviceList } = useGeneralQuery();

  return (
    <AssetTemplate title={"设备概览"}>
      <DeviceGroup>
        <TagList
          propList={deviceList || []}
          onClick={(id) => navigate(`/asset/device/${id}`)}
        />
      </DeviceGroup>
    </AssetTemplate>
  );
};

const DeviceGroup = styled.div`
  margin: 2rem 0;
  padding: 2rem 2rem;
  background-color: #fcfcfc;
  border: 1px solid #e6e6e6;
  border-left: 0.7rem solid #c0c0c0;
`;
