import React from "react";
import ReactECharts from "echarts-for-react";

export const RecordTypeChart = ({
  recordFilter,
  dateRange,
}: {
  recordFilter: { [type in string]: { [time in string]: number } };
  dateRange: [string, string];
}) => {
  const option = {
    title: [
      {
        text: "违规类别分析",
        subtext: `${dateRange[0]} ~ ${dateRange[1]}`,
        x: "center",
      },
      {
        show: Object.keys(recordFilter).length === 0,
        text: "当前选择的时间段内无可用数据",
        subtext: `请刷新或选择其它时间段`,
        textStyle: { fontSize: "18", color: "#808080" },
        subtextStyle: { fontSize: "16", color: "#A0A0A0" },
        x: "center",
        y: "center",
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : <b>{c} ({d}%)</b>",
    },
    legend: {
      top: "15%",
      left: "0%",
      orient: "vertical",
      data: Object.keys(recordFilter),
    },
    series: [
      {
        name: "违规类型",
        type: "pie",
        radius: "75%",
        center: ["50%", "55%"],
        data: Object.entries(recordFilter).map(([key, value]) => ({
          name: key,
          value: Object.values(value).reduce((prev, value) => prev + value, 0),
        })),
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

  console.log();

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
    title: [
      {
        text: "违规日期分析",
        subtext: `${dateRange[0]} ~ ${dateRange[1]}`,
        x: "center",
      },
      {
        show: Object.keys(recordFilter).length === 0,
        text: "当前选择的时间段内无可用数据",
        subtext: `请刷新或选择其它时间段`,
        textStyle: { fontSize: "18", color: "#808080" },
        subtextStyle: { fontSize: "16", color: "#A0A0A0" },
        x: "center",
        y: "center",
      },
    ],
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
        data: Object.keys(Object.values(recordFilter)[0] || {}).sort(),
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
        data: Object.entries(values)
          .sort(([a, _a], [b, _b]) => (a < b ? -1 : a > b ? 1 : 0))
          .map(([, value]) => value),
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
    title: [
      {
        text: "违规地点分析",
        subtext: `${dateRange[0]} ~ ${dateRange[1]}`,
        x: "center",
      },
      {
        show: Object.keys(recordFilter).length === 0,
        text: "当前选择的时间段内无可用数据",
        subtext: `请刷新或选择其它时间段`,
        textStyle: { fontSize: "18", color: "#808080" },
        subtextStyle: { fontSize: "16", color: "#A0A0A0" },
        x: "center",
        y: "center",
      },
    ],
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
        type: "bar",
        stack: "总量",
        barMaxWidth: "25%",
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
    title: [
      {
        text: "违规时段分析",
        subtext: `${dateRange[0]} ~ ${dateRange[1]}`,
        x: "center",
      },
      {
        show: Object.keys(recordFilter).length === 0,
        text: "当前选择的时间段内无可用数据",
        subtext: `请刷新或选择其它时间段`,
        textStyle: { fontSize: "18", color: "#808080" },
        subtextStyle: { fontSize: "16", color: "#A0A0A0" },
        x: "center",
        y: "center",
      },
    ],
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
