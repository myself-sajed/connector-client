import moment from "moment";

const generateMessageTime = (time: string | number): string => {
  return moment(time).format("hh:mm a");
};

const generateChatMessageTime = (time: string | number): string => {
  const messageDate = moment(time);
  const now = moment();

  if (messageDate.isSame(now, "day")) {
    return messageDate.format("hh:mm A");
  } else if (messageDate.isSame(now.subtract(1, "day"), "day")) {
    return "Yesterday";
  } else {
    return messageDate.format("DD/MM/YYYY");
  }
};

export { generateChatMessageTime };

export default generateMessageTime;
