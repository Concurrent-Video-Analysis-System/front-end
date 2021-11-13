import React, { ReactNode } from "react";

export const EmphasizedText = (
  title: string,
  emphasis: string,
  emphasisColor?: string
) => {
  return title.split(emphasis).reduce((prev, item, index) => {
    if (index !== 0) {
      prev.push(<span style={{ color: emphasisColor }}>{emphasis}</span>);
    }
    prev.push(<>{item}</>);
    return prev;
  }, [] as React.ReactNode[]) as ReactNode;
};
