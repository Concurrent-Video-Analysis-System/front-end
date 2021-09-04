import { Pagination } from "antd";
import React from "react";

export interface PaginationBarProps {
  enabled?: boolean;
  totalNum?: number;
  onPageChange?: (page: number, pageSize: number | undefined) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export const PaginationBar = (props: PaginationBarProps) => {
  return (
    <>
      {props.enabled ? (
        <Pagination
          showQuickJumper
          defaultCurrent={1}
          total={props.totalNum}
          onChange={props.onPageChange}
          onShowSizeChange={props.onPageSizeChange}
        />
      ) : null}
    </>
  );
};
