import React from "react";
import styled from "@emotion/styled";
import { Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

export interface FilterBarProps<
  FilterKey extends React.Key,
  OptionKey extends React.Key
> {
  filters: {
    key: FilterKey;
    title: string;
    options: {
      key: OptionKey;
      title: string;
      icon?: JSX.Element;
    }[];
    style?: React.CSSProperties;
  }[];
  filterState?: { [key in FilterKey]: OptionKey | undefined };
  onFilterUpdate: (filterKey: FilterKey, optionKey: OptionKey) => void;
}

export const FilterBar = <
  FilterKey extends React.Key,
  OptionKey extends React.Key
>(
  props: FilterBarProps<FilterKey, OptionKey>
) => {
  return (
    <Container>
      <FilterOutlined style={{ fontSize: "2rem", color: "#A0A0A0" }} />
      {props.filters.map((filter) => (
        <div style={{ minWidth: "20rem", marginRight: "2rem" }}>
          {filter.title}：
          <Select
            placeholder={filter.title}
            allowClear
            style={{ minWidth: "8rem", maxWidth: "14rem", ...filter.style }}
            value={
              props.filterState ? props.filterState[filter.key] : undefined
            }
            onChange={(value) =>
              props.onFilterUpdate(filter.key, value as OptionKey)
            }
          >
            {filter.options.map((option) => (
              <Select.Option value={option.key} key={option.key}>
                {option.icon} {option.title}
              </Select.Option>
            ))}
          </Select>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 1rem;
`;
