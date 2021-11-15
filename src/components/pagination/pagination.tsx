import { Pagination } from "antd";
import React from "react";

export interface PaginationBarProps {
  enabled?: boolean;
  currentPage?: number;
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
          defaultCurrent={props.currentPage}
          total={props.totalNum}
          onChange={props.onPageChange}
          onShowSizeChange={props.onPageSizeChange}
        />
      ) : null}
    </>
  );
};
