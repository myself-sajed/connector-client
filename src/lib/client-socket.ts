import { io } from "socket.io-client";
import config from "./config";

const socket = io(config.BACKEND_URL);

export default socket;
