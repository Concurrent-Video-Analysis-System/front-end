import React from "react";
import styled from "@emotion/styled";
import { Divider } from "antd";

export const AssetTemplate = <T extends unknown>({
  title,
  assetList,
  renderer,
}: {
  title?: string;
  assetList?: T[];
  renderer?: (asset: T) => React.ReactNode;
}) => {
  return (
    <Container>
      {title ? (
        <>
          <TitleContainer>{title}</TitleContainer>
          <TitleDivider />
        </>
      ) : null}
      {assetList?.map((asset) => (
        <>{renderer ? <AssetGroup>{renderer(asset)}</AssetGroup> : null}</>
      ))}
    </Container>
  );
};

const Container = styled.div``;

const TitleContainer = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
`;

const TitleDivider = styled(Divider)`
  margin: 1rem 0;
`;

const AssetGroup = styled.div`
  margin: 2rem 0;
  padding: 1rem 2rem;
  background-color: #fcfcfc;
  border: 1px solid #e6e6e6;
  border-left: 0.7rem solid #2990ff;
`;
