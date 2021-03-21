import { useCallback, useEffect } from "react";
import useSocket from "../../components/SocketProvider/useSocket";
import imageFromBase64 from "../../scripts/imageFromBase64";
import transform from "../../scripts/transform";

export default function useImageProcessor() {
  const { socket } = useSocket();

  const handleImageProccessing = useCallback((_image, sendResult) => {
    const run = async () => {
      const image = await imageFromBase64(_image);
      const b64 = await transform(image);
      sendResult(b64);
    };

    run();
  }, []);

  useEffect(() => {
    socket.on("process-image", handleImageProccessing);

    return () => {
      socket.off("process-image", handleImageProccessing);
    };
  }, [socket, handleImageProccessing]);
}
