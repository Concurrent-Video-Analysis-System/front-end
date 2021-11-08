import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { TagList } from "./create-task";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { AssetTemplate } from "./asset-template";

export const LocationOverviewPage = () => {
  const navigate = useNavigate();
  const { nvrList, locationList } = useGeneralQuery();

  return (
    <AssetTemplate title={"网点概览"}>
      {locationList?.map((location) => (
        <LocationGroup>
          <TitleContainer>
            <ClickableTitle
              onClick={() => navigate(`/asset/location/${location.id}`)}
            >
              {location.name}
            </ClickableTitle>
          </TitleContainer>
          <TagList
            propList={
              nvrList?.filter((nvr) => nvr.location.id === location.id) || []
            }
            onClick={(id) => navigate(`/asset/nvr/${id}`)}
          />
        </LocationGroup>
      ))}
    </AssetTemplate>
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

const LocationGroup = styled.div`
  margin: 2rem 0;
  padding: 1rem 2rem;
  background-color: #fcfcfc;
  border: 1px solid #e6e6e6;
  border-left: 0.7rem solid #2990ff;
`;
