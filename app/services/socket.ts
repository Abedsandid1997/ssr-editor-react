// import { url } from "@/utilits";
// import { io } from "socket.io-client";

// const socket = io(url, {
//   autoConnect: false,
//   withCredentials: true,
// });

// export default socket;
import { url } from "@/utilits";
import { io } from "socket.io-client";

const socket = io(url, {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = (token: string) => {
  socket.auth = { token }; // Dynamiskt sätt token innan connect
  socket.connect();
};

// Exempel i en komponent
/*
import { connectSocket } from "@/path/to/socket";

const token = "ditt-jwt-token";
connectSocket(token);
*/
export default socket;
