import { Radio } from "antd";
import React from "react";

export const TypeSwitcher = <K extends string>({
  types,
  initialType,
  onChange,
}: {
  types: { label: JSX.Element; value: K }[];
  initialType?: K;
  onChange?: (type: K) => void;
}) => {
  return (
    <Radio.Group
      defaultValue={initialType}
      optionType="button"
      buttonStyle="solid"
      style={{ minWidth: "9.5rem" }}
      onChange={(event) => {
        if (onChange) {
          onChange(event.target.value);
        }
      }}
    >
      {types.map((type) => (
        <Radio.Button value={type.value} key={type.value}>
          {type.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
