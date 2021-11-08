import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useMemo } from "react";
import { message } from "antd";
import styled from "@emotion/styled";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { AssetTemplate } from "./asset-template";
import { EmphasizedText } from "components/title/emphasized";
import { useDevice } from "utils/crud/device";

export const DevicePage = () => {
  const navigate = useNavigate();
  const { deviceId } = useParams();
  const { deviceList } = useGeneralQuery();

  const device = useMemo(() => {
    return deviceList?.find((item) => item.id === +deviceId);
  }, [deviceId, deviceList]);

  const { deleteDevice } = useDevice();

  useEffect(() => {
    if (!device) {
      message.error(`找不到编号为 ${deviceId} 的设备`).then(null);
      navigate(`/asset/device`);
    }
  }, [device, deviceId, navigate]);

  const handleDelete = () => {
    if (device) {
      deleteDevice({ idList: [device.id] }).then(() =>
        message.success("删除设备成功！")
      );
    }
  };

  return (
    <AssetTemplate
      title={EmphasizedText(
        `${device?.name} 设备`,
        `${device?.name}`,
        "#606060"
      )}
      showDelete
      onDelete={handleDelete}
    >
      <Content>
        <Label>设备编号：</Label>
        <Text>#{device?.id}</Text>
      </Content>

      <Content>
        <Label>所在网点：</Label>
        <Text>
          {EmphasizedText(
            `${device?.location.name} - #${device?.location.id}`,
            ` - #${device?.location.id}`,
            "#A0A0A0"
          )}
        </Text>
      </Content>

      <Content>
        <Label>所在 NVR：</Label>
        <Text>
          {EmphasizedText(
            `${device?.nvr.name} - #${device?.nvr.id}`,
            ` - #${device?.nvr.id}`,
            "#A0A0A0"
          )}
        </Text>
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
