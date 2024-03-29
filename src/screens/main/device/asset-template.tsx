import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, Divider, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { EmphasizedText } from "components/title/emphasized";

export const AssetTemplate = ({
  title,
  children,
  showDelete,
  onDelete,
}: {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  showDelete?: boolean;
  onDelete?: () => Promise<any>;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Container>
      {title ? (
        <>
          <TitleContainer>
            <div>{title}</div>
            {showDelete ? (
              <Popconfirm
                title={EmphasizedText(
                  "是否删除该条目下的所有信息？",
                  "所有",
                  "#ff4f4f"
                )}
                okText={<PopButtonText>删 除</PopButtonText>}
                cancelText={<PopButtonText>取 消</PopButtonText>}
                okButtonProps={{ danger: true, size: "middle" }}
                cancelButtonProps={{ size: "middle" }}
                onConfirm={() => {
                  setIsDeleting(true);
                  onDelete && onDelete().finally(() => setIsDeleting(false));
                }}
                placement={"bottom"}
              >
                <DeleteButton
                  type={"primary"}
                  shape={"circle"}
                  loading={isDeleting}
                >
                  <DeleteOutlined />
                </DeleteButton>
              </Popconfirm>
            ) : null}
          </TitleContainer>
          <TitleDivider />
        </>
      ) : null}
      {children}
    </Container>
  );
};

const Container = styled.div``;

const TitleContainer = styled.div`
  font-size: 2.7rem;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
`;

const TitleDivider = styled(Divider)`
  margin: 1rem 0;
`;

const PopButtonText = styled.div`
  // padding: 1rem;
`;

const DeleteButton = styled(Button)`
  border: 1.5px solid #ff4d4f;
  color: #ff4d4f;
  background-color: transparent;
  transition: all 0.2s;

  :hover {
    color: #ffffff;
    border: 1.5px solid #ff4d4f;
    background-color: #ff4d4f;
  }

  :focus {
    color: #ffffff;
    border: 1.5px solid #ff4d4f;
    background-color: #ff4d4f;
  }

  :active {
    color: #ffffff;
    border: 1.5px solid #db1d1d;
    background-color: #db1d1d;
  }
`;
