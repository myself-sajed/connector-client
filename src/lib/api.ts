// create axios instance
import axios from "axios";
import config from "./config";
import { LIMIT } from "./constants";

type LoginType = {
  email: string;
  password: string;
};

export interface CreateUserFormData {
  username: string;
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
  bio: string;
  avatar: number;
}
export interface UpdateUserFormData {
  username: string;
  name: string;
  email: string;
  userId: string;
  bio: string;
  avatar: number;
}

export const api = axios.create({
  baseURL: `${config.BACKEND_URL}/api`,
  withCredentials: true,
});

// api requests

export const createUser = (formData: CreateUserFormData) =>
  api.post(`/users/create`, formData);

export const editUser = (formData: UpdateUserFormData) =>
  api.post(`/users/edit`, formData);

export const getUsers = (user: string | null) => api.get(`/users/${user}`);

export const getChats = (meId: string | null) => api.get(`/chats/${meId}`);

export const createChat = (contactId: string, meId: string) =>
  api.post(`/chats/create`, { contactId, meId });

export const getMessages = (chatId: string, page: number) =>
  api.get(`/messages/${chatId}?page=${page}&limit=${LIMIT}`);

export const authenticate = () => {
  return api.get("/auth/authenticate");
};

export const login = ({ email, password }: LoginType) => {
  return api.post("/auth/login", { email, password });
};

export const logout = () => {
  return api.post("/auth/logout");
};
