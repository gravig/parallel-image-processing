import { useCallback, useEffect } from "react";
import useSocket from "../../components/SocketProvider/useSocket";

export default function useImageProcessor() {
  const { socket } = useSocket();

  const handleImageProccessing = useCallback((image, sendResult) => {
    console.log(`Image proccesing...`);
  }, []);

  useEffect(() => {
    socket.on("process-image", handleImageProccessing);

    return () => {
      socket.off("process-image", handleImageProccessing);
    };
  }, [socket, handleImageProccessing]);
}
