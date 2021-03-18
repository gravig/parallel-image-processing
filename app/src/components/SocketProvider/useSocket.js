import { useContext } from "react";
import { SocketContext } from "./SocketProvider";

export default function useSocket() {
  const socket = useContext(SocketContext);

  return { socket };
}
