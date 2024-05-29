// create axios instance
import axios from "axios";
import config from "./config";

type LoginType = {
  email: string;
  password: string;
};

const api = axios.create({
  baseURL: `${config.BACKEND_URL}/api`,
  withCredentials: true,
});

// api requests
export const getUsers = (user: string | null) => api.get(`/users/${user}`);

export const getChats = (meId: string | null) => api.get(`/chats/${meId}`);

export const createChat = (contactId: string, meId: string) =>
  api.post(`/chats/create`, { contactId, meId });

export const getMessages = (chatId: string) => api.get(`/messages/${chatId}`);

export const authenticate = () => {
  return api.get("/auth/authenticate");
};

export const login = ({ email, password }: LoginType) => {
  return api.post("/auth/login", { email, password });
};

export const logout = () => {
  return api.post("/auth/logout");
};
