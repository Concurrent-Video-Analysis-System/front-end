import { AssetTemplate } from "./asset-template";
import { EmphasizedText } from "components/title/emphasized";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useGeneralQuery } from "../../../utils/new-fetcher/general";
import { useEffect, useMemo } from "react";
import { DeviceProps } from "./device.slice";
import { message } from "antd";
import styled from "@emotion/styled";
import { TagList } from "./create-task";

export const NvrPage = () => {
  const navigate = useNavigate();
  const { nvrId } = useParams();
  const { nvrList, deviceList } = useGeneralQuery();

  const nvr = useMemo(() => {
    return nvrList?.find((item) => item.id === +nvrId);
  }, [nvrId, nvrList]);

  const deviceAtNvr = useMemo(() => {
    if (!nvr) {
      return [] as DeviceProps[];
    }
    return deviceList?.filter((device) => device.nvr.id === nvr.id);
  }, [nvr, deviceList]);

  useEffect(() => {
    if (!nvr) {
      message.error(`找不到编号为 ${nvrId} 的 NVR`).then(null);
      navigate(`/asset/location`);
    }
  }, [navigate, nvr, nvrId]);
  return (
    <AssetTemplate
      title={EmphasizedText(`${nvr?.name} NVR`, `${nvr?.name}`, "#f88700")}
    >
      <Content>
        <Label>NVR 编号：</Label>
        <Text>#{nvr?.id}</Text>
      </Content>

      <Content>
        <Label>所在网点：</Label>
        <Text>
          {EmphasizedText(
            `${nvr?.location.name} - #${nvr?.location.id}`,
            ` - #${nvr?.location.id}`,
            "#A0A0A0"
          )}
        </Text>
      </Content>

      <Content>
        <Label>端口号：</Label>
        <Text>{EmphasizedText(`${nvr?.ip}`, ".", "#C0C0C0")}</Text>
      </Content>

      <Content>
        <TagList
          preStr={<Label>设备列表：</Label>}
          propList={deviceAtNvr || []}
          showEmpty
          onClick={(id) => navigate(`/asset/device/${id}`)}
        />
      </Content>
    </AssetTemplate>
  );
};

const Content = styled.div`
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  display: inline-block;
  text-align: right;
  width: 12rem;
`;

const Text = styled.div`
  display: inline;
  font-size: 1.7rem;
  max-width: 70%;
`;
