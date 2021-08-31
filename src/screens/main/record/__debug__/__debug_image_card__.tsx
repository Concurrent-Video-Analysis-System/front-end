import { useEffect, useMemo } from "react";
import { recordlistSlice } from "screens/main/recordlist.slice";
import { useDispatch } from "react-redux";
import { RecordItemProps } from "../content";

const recordTemplate: RecordItemProps[] = [
  {
    id: 1,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-16 08:00:00",
    reason: "离岗未锁屏",
    location: "山东路网点",
  },
  {
    id: 2,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-16 07:00:00",
    reason: "手机拍屏幕",
    location: "山东路网点",
  },
  {
    id: 3,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-15 17:00:00",
    reason: "日终封箱",
    location: "山东路网点",
  },
  {
    id: 4,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-15 17:00:00",
    reason: "离岗未锁屏",
    location: "枝江路网点",
  },
  {
    id: 5,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-15 17:30:00",
    reason: "日终封箱",
    location: "青岛路网点",
  },
  {
    id: 6,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-15 12:00:00",
    reason: "手机拍屏幕",
    location: "山东路网点",
  },
  {
    id: 7,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-15 09:00:00",
    reason: "离岗未锁屏",
    location: "枝江路网点",
  },
  {
    id: 8,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-14 18:00:00",
    reason: "离岗未锁屏",
    location: "山东路网点",
  },
  {
    id: 9,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-13 16:00:00",
    reason: "手机拍屏幕",
    location: "枝江路网点",
  },
  {
    id: 10,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-13 15:00:00",
    reason: "手机拍屏幕",
    location: "枝江路网点",
  },
  {
    id: 11,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-13 11:00:00",
    reason: "离岗未锁屏",
    location: "山东路网点",
  },
  {
    id: 12,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-13 10:00:00",
    reason: "手机拍屏幕",
    location: "山东路网点",
  },
  {
    id: 13,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-12 17:00:00",
    reason: "日终封箱",
    location: "山东路网点",
  },
  {
    id: 14,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-12 15:00:00",
    reason: "手机拍屏幕",
    location: "青岛路网点",
  },
  {
    id: 15,
    imageUrl: "__test__/template_image.png",
    type: "processed",
    date: "2021-08-12 12:00:00",
    reason: "离岗未锁屏",
    location: "山东路网点",
  },
];

export const useDebugImageCard = () => {
  const dispatch = useDispatch();

  const data: RecordItemProps[] = useMemo(() => {
    return recordTemplate;
    /*return recordDataTemplate.data_list.map((item) => {
      return {
        id: item.id,
        date: item.time,
        imageUrl: item.image_data,
        type: "pending",
        location: item.location,
        reason: item.abnormal_class,
      };
    });*/
  }, []);

  useEffect(() => {
    dispatch(recordlistSlice.actions.set(data));
  }, [data, dispatch]);
};
