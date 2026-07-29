import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  "http://localhost:5000";

const socket = io(SOCKET_URL, {
  autoConnect: false,

  /*
  |--------------------------------------------------------------------------
  | Transport
  |--------------------------------------------------------------------------
  */

  transports: ["websocket", "polling"],

  /*
  |--------------------------------------------------------------------------
  | Reconnection
  |--------------------------------------------------------------------------
  */

  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,

  /*
  |--------------------------------------------------------------------------
  | Timeout
  |--------------------------------------------------------------------------
  */

  timeout: 20000,

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  */

  withCredentials: false,
});

socket.on("connect", () => {
  console.log("🟢 Socket Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Socket Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.warn("⚠ Socket Connection Error:", error.message);
});

socket.io.on("reconnect", (attempt) => {
  console.log(`🟢 Socket Reconnected (${attempt})`);
});

socket.io.on("reconnect_attempt", (attempt) => {
  console.log(`Reconnect Attempt ${attempt}`);
});

export default socket;