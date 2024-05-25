// create axios instance
import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config.BACKEND_URL,
});

// api requests
export const getUsers = (user: string | null) => api.get(`/api/users/${user}`);
export const getChats = (meId: string | null) => api.get(`/api/chats/${meId}`);
export const createChat = (contactId: string, meId: string) =>
  api.post(`/api/chats/create`, { contactId, meId });
export const getMessages = (chatId: string) =>
  api.get(`/api/messages/${chatId}`);
