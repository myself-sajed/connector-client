import moment from "moment";

const generateMessageTime = (time: string | number): string => {
  return moment(time).format("hh:mm a");
};

export default generateMessageTime;
