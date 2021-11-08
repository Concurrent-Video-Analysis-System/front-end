import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { message, Typography } from "antd";
import styled from "@emotion/styled";
import { EditTwoTone } from "@ant-design/icons";
import { DeviceProps } from "./device.slice";
import { TagList } from "./create-task";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { AssetTemplate } from "./asset-template";
import { EmphasizedText } from "../../../components/title/emphasized";
import { useBankLocation } from "../../../utils/crud/location";

export const LocationPage = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const { locationList, nvrList, deviceList } = useGeneralQuery();

  const location = useMemo(() => {
    return locationList?.find((item) => item.id === +locationId);
  }, [locationId, locationList]);

  const nvrAtLocation = useMemo(() => {
    if (!location) {
      return [] as NvrProps[];
    }
    return nvrList?.filter((nvr) => nvr.location.id === location.id);
  }, [location, nvrList]);

  const deviceAtLocation = useMemo(() => {
    if (!location) {
      return [] as DeviceProps[];
    }
    return deviceList?.filter((device) => device.location.id === location.id);
  }, [location, deviceList]);

  const { deleteLocation } = useBankLocation();

  useEffect(() => {
    if (!location) {
      message.error(`找不到编号为 ${locationId} 的网点`).then(null);
      navigate(`/asset/location`);
    }
  }, [location, locationId, navigate]);

  const handleDelete = () => {
    deleteLocation({ idList: [`${location?.id}`] }).then(() =>
      message.success("删除成功！")
    );
  };

  return (
    <AssetTemplate
      title={EmphasizedText(
        `${location?.name} 网点`,
        `${location?.name}`,
        "#1890ff"
      )}
      showDelete
      onDelete={handleDelete}
    >
      <Content>
        <Label>网点编号：</Label>
        <Text>#{location?.id}</Text>
      </Content>

      <Content>
        <Label>网点地址：</Label>
        <Text>{location?.location}</Text>
      </Content>

      <Content>
        <TagList
          preStr={<Label>NVR 列表：</Label>}
          showEmpty
          propList={nvrAtLocation || []}
          onClick={(id) => navigate(`/asset/nvr/${id}`)}
        />
      </Content>

      <Content>
        <TagList
          preStr={<Label>设备列表：</Label>}
          showEmpty
          propList={deviceAtLocation || []}
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
