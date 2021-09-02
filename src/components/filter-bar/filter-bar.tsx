import styled from "@emotion/styled";
import { Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

export interface FilterBarProps {
  filters: {
    key: string;
    title: string;
    options: {
      key: string;
      title: string;
      icon?: JSX.Element;
    }[];
  }[];
}

export const FilterBar = (props: FilterBarProps) => {
  return (
    <Container>
      <FilterOutlined style={{ fontSize: "2rem", color: "#A0A0A0" }} />
      {props.filters.map((filter) => (
        <div style={{ width: "24rem" }}>
          {filter.title}：
          <Select
            placeholder={filter.title}
            allowClear
            style={{ minWidth: "8rem", maxWidth: "14rem" }}
          >
            {filter.options.map((option) => (
              <Select.Option value={option.key}>
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
