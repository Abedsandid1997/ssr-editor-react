// import { url } from "@/utilits";
// import { io } from "socket.io-client";

// const socket = io(url, {
//   autoConnect: false,
//   withCredentials: true,
// });

// export default socket;
import { url } from "@/utilits";
import { io } from "socket.io-client";
import { useAuth } from "@/app/AuthContext";

// Exempel i en hook eller komponent
const { token } = useAuth();

const socket = io(url, {
  autoConnect: false,
  withCredentials: true,
  auth: {
    token, // här skickar vi JWT-token
  },
});

export default socket;
