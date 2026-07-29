import socket from "./socketClient";

import { SOCKET_EVENTS } from "./socketEvents";

import {
  addNotification,
} from "@/features/dashboard/notifications/notificationSlice";

import {
  addActivity,
} from "@/features/dashboard/activity/activitySlice";

/*
|--------------------------------------------------------------------------
| Socket Initialization
|--------------------------------------------------------------------------
*/

let initialized = false;

export const initializeSocket = (store) => {
  if (!store) {
    console.warn("Socket initialization skipped: store missing.");
    return () => {};
  }

  /*
  |--------------------------------------------------------------------------
  | Prevent duplicate listeners
  |--------------------------------------------------------------------------
  */

  if (initialized) {
    return () => {};
  }

  initialized = true;

  /*
  |--------------------------------------------------------------------------
  | Socket Enabled?
  |--------------------------------------------------------------------------
  */

  const socketEnabled =
    import.meta.env.VITE_ENABLE_SOCKET === "true";

  /*
  |--------------------------------------------------------------------------
  | Connection Handlers
  |--------------------------------------------------------------------------
  */

  const handleConnect = () => {
    console.log("🟢 Socket Connected:", socket.id);
  };

  const handleDisconnect = (reason) => {
    console.log("🔴 Socket Disconnected:", reason);
  };

  const handleReconnect = () => {
    console.log("🟢 Socket Reconnected");
  };

  const handleConnectError = (error) => {
    console.warn("Socket connection failed:", error?.message);
  };

  /*
  |--------------------------------------------------------------------------
  | Dashboard Events
  |--------------------------------------------------------------------------
  */

  const handleNewOrder = (data = {}) => {
    store.dispatch(
      addNotification({
        type: SOCKET_EVENTS.NEW_ORDER,
        title: "New Order",
        message: `Order ${data.orderId || ""} received`,
        priority: "HIGH",
      })
    );

    store.dispatch(
      addActivity({
        title: "New Order",
        message: `Order ${data.orderId || ""} received`,
        time: "Just now",
      })
    );
  };

  const handleLowStock = (data = {}) => {
    store.dispatch(
      addNotification({
        type: SOCKET_EVENTS.LOW_STOCK,
        title: "Low Stock",
        message: `${data.product || "Product"} stock is low`,
        priority: "HIGH",
      })
    );

    store.dispatch(
      addActivity({
        title: "Inventory Alert",
        message: `${data.product || "Product"} needs restocking`,
        time: "Just now",
      })
    );
  };

  const handleStockUpdated = (data = {}) => {
    store.dispatch(
      addActivity({
        title: "Inventory Updated",
        message: `${data.product || "Product"} inventory updated`,
        time: "Just now",
      })
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Register Events
  |--------------------------------------------------------------------------
  */

  socket.off();

  socket.on("connect", handleConnect);
  socket.on("disconnect", handleDisconnect);
  socket.on("connect_error", handleConnectError);

  if (socket.io) {
    socket.io.off("reconnect");
    socket.io.on("reconnect", handleReconnect);
  }

  socket.on(SOCKET_EVENTS.NEW_ORDER, handleNewOrder);
  socket.on(SOCKET_EVENTS.LOW_STOCK, handleLowStock);
  socket.on(SOCKET_EVENTS.STOCK_UPDATED, handleStockUpdated);

  /*
  |--------------------------------------------------------------------------
  | Connect
  |--------------------------------------------------------------------------
  */

  if (
    socketEnabled &&
    !socket.connected &&
    !socket.active
  ) {
    socket.connect();
  }

  /*
  |--------------------------------------------------------------------------
  | Cleanup
  |--------------------------------------------------------------------------
  */

  return () => {
    socket.off("connect", handleConnect);
    socket.off("disconnect", handleDisconnect);
    socket.off("connect_error", handleConnectError);

    if (socket.io) {
      socket.io.off("reconnect", handleReconnect);
    }

    socket.off(
      SOCKET_EVENTS.NEW_ORDER,
      handleNewOrder
    );

    socket.off(
      SOCKET_EVENTS.LOW_STOCK,
      handleLowStock
    );

    socket.off(
      SOCKET_EVENTS.STOCK_UPDATED,
      handleStockUpdated
    );

    // Reset flag for HMR or remounts.
    initialized = false;

    // Do NOT disconnect here.
    // The socket client manages its own lifecycle.
  };
};