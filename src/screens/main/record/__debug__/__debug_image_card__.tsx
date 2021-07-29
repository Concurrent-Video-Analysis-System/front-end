import { recordListTemplate } from "./data";
import { useEffect, useMemo } from "react";
import { recordlistSlice } from "screens/main/recordlist.slice";
import { useDispatch } from "react-redux";
import { type } from "os";
import { RecordItemProps } from "../recordlist-component/record-content";

export const useDebugImageCard = () => {
  const dispatch = useDispatch();

  const data: RecordItemProps[] = useMemo(() => {
    return recordListTemplate.data_list.map((item) => {
      return {
        id: item.id,
        date: item.time,
        imageUrl: `data:image/png;base64,${item.image_data}`,
        type: "pending",
        location: item.location,
        reason: item.abnormal_class,
      };
    });
  }, []);

  useEffect(() => {
    dispatch(recordlistSlice.actions.set(data));
  }, []);
};
