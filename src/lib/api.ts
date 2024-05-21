// create axios instance
import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config.BACKEND_URL,
});

// api requests
export const getUsers = () => api.get("/api/users/");
