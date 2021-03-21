import React, { memo, useCallback, useState } from "react";
import ImageMesh from "../../scripts/ImageMesh";
import imageFromFile from "../../scripts/imageFromFile";
import ImageMeshView from "../../components/ImageMesh/ImageMesh";
import useSocket from "../../components/SocketProvider/useSocket.js";
import useImageProcessor from "./useImageProcessor";
import imageToBase64 from "../../scripts/imageToBase64";
import "./Home.scss";

const DEPTH = 1;

const Home = () => {
  const { socket } = useSocket();
  const [mesh, setMesh] = useState(null);
  useImageProcessor();

  const handleSelectImage = useCallback((e) => {
    const files = e.target.files;

    if (files?.length < 1) return;
    const [file] = files;

    imageFromFile(file).then((image) => {
      const _mesh = new ImageMesh(image);

      _mesh.divide(DEPTH).then(() => {
        setMesh(_mesh);
      });
    });
  }, []);

  const handleClickStart = useCallback(() => {
    mesh.images.forEach((fragment) => {
      fragment.isLoading = true;
    });
    setMesh(mesh.cloneDeep());

    mesh.images.forEach(async (fragment) => {
      const base64 = await imageToBase64(fragment.image);

      socket.emit("image", base64, (resultBase64) => {
        fragment.isLoading = false;
        fragment.setImageBase64(resultBase64).then(() => {
          setMesh(mesh.cloneDeep());
        });
      });
    });
  }, [mesh, socket]);

  return (
    <div className="Home">
      {mesh ? (
        <div className="Home__container">
          <ImageMeshView images={mesh?.images} depth={DEPTH} />
        </div>
      ) : (
        <input type="file" onChange={handleSelectImage} />
      )}

      <button onClick={handleClickStart}>Start</button>
    </div>
  );
};

export default memo(Home);
