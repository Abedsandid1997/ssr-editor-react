import { url } from "@/utilits";
import { io } from "socket.io-client";

const socket = io(url, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
