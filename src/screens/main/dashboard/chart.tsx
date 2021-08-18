import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { selectRecordlistReducer } from "../recordlist.slice";
import { useSelector } from "react-redux";

export const RecordTypeChart = ({
  recordFilter,
  dateRange,
}: {
  recordFilter: { [type in string]: { [time in string]: number } };
  dateRange: [string, string];
}) => {
  const option = {
    title: {
      text: "违规类别分析",
      subtext: `${dateRange[0]} ~ ${dateRange[1]}`,
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : <b>{c} ({d}%)</b>",
    },
    legend: {
      top: "20%",
      left: "5%",
      orient: "vertical",
      data: Object.keys(recordFilter),
    },
    series: [
      {
        name: "违规类型",
        type: "pie",
        radius: "75%",
        center: ["50%", "55%"],
        data: Object.entries(recordFilter).map(([key, value]) => {
          return {
            name: key,
            value: Object.values(value).reduce(
              (prev, value) => prev + value,
              0
            ),
          };
        }),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "40rem", minWidth: "55rem" }}
    />
  );
};

export const RecordDateChart = ({
  recordFilter,
  dateRange,
}: {
  recordFilter: { [type in string]: { [time in string]: number } };
  dateRange: [string, string];
}) => {
  const option = {
    title: {
      text: "违规日期分析",
      subtext: `${dateRange[0]} ~ ${dateRange[1]}`,
      x: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: "13%",
      data: Object.keys(recordFilter),
    },
    grid: {
      top: "20%",
      left: "5%",
      right: "8%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: Object.keys(Object.values(recordFilter)[0] || {}),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: Object.entries(recordFilter).map(([recordType, values]) => {
      return {
        name: recordType,
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: Object.values(values),
      };
    }),
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "40rem", minWidth: "55rem" }}
    />
  );
};

export const RecordLocationChart = ({
  recordFilter,
  dateRange,
}: {
  recordFilter: { [type in string]: { [time in string]: number } };
  dateRange: [string, string];
}) => {
  const option = {
    title: {
      text: "违规地点分析",
      subtext: `${dateRange[0]} ~ ${dateRange[1]}`,
      x: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: "13%",
      data: Object.keys(recordFilter),
    },
    grid: {
      top: "20%",
      left: "5%",
      right: "8%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: Object.keys(Object.values(recordFilter)[0] || {}),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: Object.entries(recordFilter).map(([recordType, values]) => {
      return {
        name: recordType,
        type: "bar",
        stack: "总量",
        areaStyle: { normal: {} },
        data: Object.values(values),
      };
    }),
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "40rem", minWidth: "55rem" }}
    />
  );
};

export const RecordTimeChart = ({
  recordFilter,
  dateRange,
}: {
  recordFilter: { [type in string]: { [time in string]: number } };
  dateRange: [string, string];
}) => {
  const option = {
    title: {
      text: "违规时段分析",
      subtext: `${dateRange[0]} ~ ${dateRange[1]}`,
      x: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: "13%",
      data: Object.keys(recordFilter),
    },
    grid: {
      top: "20%",
      left: "5%",
      right: "8%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: Object.keys(Object.values(recordFilter)[0] || {}),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: Object.entries(recordFilter).map(([recordType, values]) => {
      return {
        name: recordType,
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: Object.values(values),
      };
    }),
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "40rem", minWidth: "55rem" }}
    />
  );
};
