import { selectLocationReducer } from "./location.slice";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

export const LocationFragment = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const locationSelector = useSelector(selectLocationReducer);

  const location = useMemo(() => {
    return locationSelector.locationList.find(
      (item) => item.id === +locationId
    );
  }, [locationId, locationSelector.locationList]);

  useEffect(() => {
    if (!location) {
      navigate(`/device`);
    }
  }, [location, navigate]);

  return (
    <>
      <h1>{location?.name}</h1>
      <h3>{location?.location}</h3>
    </>
  );
};
