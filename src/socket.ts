import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const socket = io(import.meta.env.VITE_SOCKET_URI, {
  auth: {
    token,
  },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 3,
  autoConnect: false,
});

export default socket;
