const apiUrl = process.env.REACT_APP_API_URL;

export const exportRecordList = () => {
  window.open(`${apiUrl}/export`);
};
