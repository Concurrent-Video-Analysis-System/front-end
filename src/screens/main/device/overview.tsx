import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LocationProps } from "./location.slice";
import { DeviceProps } from "./device.slice";
import styled from "@emotion/styled";
import { TagList } from "./create-task";
import { AssetListTemplate } from "./asset-template";
import { selectGeneralListReducer } from "../general-list.slice";
import { useMemo } from "react";

export const AssetOverviewPage = () => {
  const navigate = useNavigate();
  const generalListSelector = useSelector(selectGeneralListReducer);
  const deviceList = useMemo(
    () => generalListSelector.generalList.device as DeviceProps[] | undefined,
    [generalListSelector]
  );
  const locationList = useMemo(
    () =>
      generalListSelector.generalList.location as LocationProps[] | undefined,
    [generalListSelector]
  );

  return (
    <AssetListTemplate
      title={"网点设备概览"}
      assetList={locationList}
      renderer={(location) => (
        <>
          <TitleContainer>
            <ClickableTitle
              onClick={() => navigate(`/asset/location/${location.id}`)}
            >
              {location.name}
            </ClickableTitle>
          </TitleContainer>
          <TagList
            propList={
              deviceList?.filter(
                (device) => device.location.id === location.id
              ) || []
            }
            onClick={(id) => navigate(`/asset/device/${id}`)}
          />
        </>
      )}
    />
  );
};

const TitleContainer = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  padding-bottom: 0.8rem;
`;

const ClickableTitle = styled.span`
  color: #1890ff;
  cursor: pointer;
  transition: color 0.2s;
  :hover {
    color: #40a9ff;
  }
`;
