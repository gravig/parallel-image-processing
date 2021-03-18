import React, { memo, useCallback, useState } from "react";
import ImageMesh from "../../scripts/ImageMesh";
import imageFromFile from "../../scripts/imageFromFile";
import ImageMeshView from "../../components/ImageMesh/ImageMesh";
import useImageProcessor from "./useImageProcessor";

const DEPTH = 1;

const Home = () => {
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

  return (
    <div className="Home">
      <input type="file" onChange={handleSelectImage} />
      <ImageMeshView images={mesh?.images} depth={DEPTH} />
    </div>
  );
};

export default memo(Home);
