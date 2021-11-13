import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { TagList } from "./create-task";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { AssetTemplate } from "./asset-template";
import { EmphasizedText } from "components/title/emphasized";

export const NvrOverviewPage = () => {
  const navigate = useNavigate();
  const { nvrList, deviceList } = useGeneralQuery();

  return (
    <AssetTemplate
      title={EmphasizedText(
        "NVR 概览（Network Video Recorder，网络视频录像机）",
        "（Network Video Recorder，网络视频录像机）",
        "#D0D0D0"
      )}
    >
      {nvrList?.map((nvr) => (
        <NvrGroup>
          <TitleContainer>
            <ClickableTitle onClick={() => navigate(`/asset/nvr/${nvr.id}`)}>
              {nvr.name}
            </ClickableTitle>
          </TitleContainer>
          <TagList
            propList={
              deviceList?.filter((device) => device.nvr.id === nvr.id) || []
            }
            onClick={(id) => navigate(`/asset/device/${id}`)}
          />
        </NvrGroup>
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
  color: #ff8a00;
  cursor: pointer;
  transition: color 0.2s;

  :hover {
    color: #ffac4b;
  }
`;

const NvrGroup = styled.div`
  margin: 2rem 0;
  padding: 1rem 2rem;
  background-color: #fcfcfc;
  border: 1px solid #e6e6e6;
  border-left: 0.7rem solid #ffa73c;
`;
