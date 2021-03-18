import React, { createContext, memo, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket] = useState(io("http://localhost:3000/"));

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default memo(SocketProvider);
