import styled from "@emotion/styled";
import { DashBoardAside } from "./aside";
import { Select } from "antd";
import {
  RecordLocationChart,
  RecordDateChart,
  RecordTypeChart,
  RecordTimeChart,
} from "./chart";
import { useDebugImageCard } from "../record/__debug__/__debug_image_card__";
import { useMemo, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectRecordlistReducer } from "../recordlist.slice";
import { selectLocationReducer } from "../device/location.slice";
import { useDebugDeviceLocation } from "../device/__debug__/__debug_add_device__";
import { pad } from "utils/time";
import { useFetchRecordList } from "utils/fetcher/recordlist";
import { useFetchLocation } from "utils/fetcher/location";

const usePastXDays = (x: number) => {
  return useMemo(() => {
    return Array.from(Array(x).keys())
      .reverse()
      .map((item) => {
        return moment().subtract(item, "day").format("YYYY-MM-DD");
      });
  }, [x]);
};

const useEveryHourInADay = () => {
  return useMemo(() => {
    return Array.from(Array(24).keys()).map((item) => {
      return `${pad(item)}:00:00`;
    });
  }, []);
};

export const DashBoard = () => {
  useFetchRecordList({});
  useFetchLocation();
  const recordlistSelector = useSelector(selectRecordlistReducer);
  const locationSelector = useSelector(selectLocationReducer);

  const [pastDays, setPastDays] = useState(7);
  const pastDayList = usePastXDays(pastDays);
  const dateRange: [string, string] = [
    pastDayList[0],
    pastDayList[pastDayList.length - 1],
  ];
  const timeList = useEveryHourInADay();

  const recordReasonDateFilter: {
    [type in string]: { [date in string]: number };
  } = recordlistSelector.recordlist.reduce((prev, record) => {
    const reason = record.reason;
    const date = record.date?.split(" ")[0];
    if (reason && date) {
      if (!prev[reason]) {
        prev[reason] = Object.fromEntries(
          pastDayList.map((dayString) => [dayString, 0])
        );
      }
      if (pastDayList.includes(date)) {
        prev[reason][date] = (prev[reason][date] || 0) + 1;
      }
    }
    return prev;
  }, {} as { [type in string]: { [date in string]: number } });

  const recordReasonLocationFilter: {
    [type in string]: { [location in string]: number };
  } = recordlistSelector.recordlist.reduce((prev, record) => {
    const reason = record.reason;
    const location = record.location;
    if (reason && location) {
      if (!prev[reason]) {
        prev[reason] = Object.fromEntries(
          locationSelector.locationList.map((location) => [location.name, 0])
        );
      }
      prev[reason][location] = (prev[reason][location] || 0) + 1;
    }
    return prev;
  }, {} as { [type in string]: { [date in string]: number } });

  const recordReasonTimeFilter: {
    [type in string]: { [time in string]: number };
  } = recordlistSelector.recordlist.reduce((prev, record) => {
    const reason = record.reason;
    const time = record.date?.split(" ")[1];
    if (reason && time) {
      if (!prev[reason]) {
        prev[reason] = Object.fromEntries(
          timeList.map((timeString) => [timeString, 0])
        );
      }
      prev[reason][time] = (prev[reason][time] || 0) + 1;
    }
    return prev;
  }, {} as { [type in string]: { [time in string]: number } });

  return (
    <Container>
      <Aside>
        <DashBoardAside />
      </Aside>
      <Header>
        展示
        <Select
          defaultValue="7"
          style={{
            width: "13rem",
            fontSize: "2rem",
            textAlign: "center",
          }}
          bordered={false}
          onChange={(value) => setPastDays(+value)}
        >
          <Select.Option value="7">最近 7 天</Select.Option>
          <Select.Option value="30">最近一月</Select.Option>
          <Select.Option value="365">最近一年</Select.Option>
        </Select>
        的数据
      </Header>
      <ChartContainer id={"1"}>
        <RecordTypeChart
          recordFilter={recordReasonDateFilter}
          dateRange={dateRange}
        />
      </ChartContainer>
      <ChartContainer id={"2"}>
        <RecordDateChart
          recordFilter={recordReasonDateFilter}
          dateRange={dateRange}
        />
      </ChartContainer>
      <ChartContainer id={"3"}>
        <RecordLocationChart
          recordFilter={recordReasonLocationFilter}
          dateRange={dateRange}
        />
      </ChartContainer>
      <ChartContainer id={"4"}>
        <RecordTimeChart
          recordFilter={recordReasonTimeFilter}
          dateRange={dateRange}
        />
      </ChartContainer>
    </Container>
  );
};

DashBoard.whyDidYouRender = true;

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas:
    "aside header header"
    "aside chart1 chart2"
    "aside chart3 chart4";
  grid-template-columns: 34rem 1fr 1fr;
  grid-template-rows: 6rem 1fr 1fr;
`;

const Aside = styled.div`
  grid-area: aside;
  position: fixed;
  width: 34rem;
  overflow-y: auto;
  background-color: #f7f7f7;
  padding: 1.5rem 2rem;
  border-right: 1px solid #e7e7e7;
`;

const Header = styled.div`
  grid-area: header;
  margin: 0 3rem;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 2.2rem;
  font-weight: bold;
`;

const ChartContainer = styled.div<{ id: string }>`
  grid-area: chart ${(props) => props.id};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #808080;
`;

// 违规记录类型 违规记录随时间的变化 违规记录随网点的变化
