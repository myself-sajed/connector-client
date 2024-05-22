// create axios instance
import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config.BACKEND_URL,
});

// api requests
export const getUsers = () => api.get("/api/users/");
export const getChats = (meId: string | null) => api.get(`/api/chats/${meId}`);
export const getMessages = (chatId: string | null, meId: string | null) =>
  api.get(`/api/messages/${chatId}/${meId}`);
