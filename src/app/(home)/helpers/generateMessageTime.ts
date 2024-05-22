import moment from "moment";

const generateMessageTime = (time: string): string => {
  return moment(time).format("hh:mm a");
};

export default generateMessageTime;
