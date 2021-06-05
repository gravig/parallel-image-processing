import React, { memo } from "react";
import ImageFragment from "./ImageFragment";
import "./ImageMesh.scss";

const recursiveRender = (fragment) => {
  if (!fragment.isDivided) return <ImageFragment fragment={fragment} />;

  return (
    <div className="chunk">
      {fragment.fragments.map((f) => recursiveRender(f))}
    </div>
  );
};

const ImageMesh = ({ mesh }) => {
  return (
    <div className="ImageMesh">
      <div className="ImageMesh__image">{recursiveRender(mesh.root)}</div>
    </div>
  );
};

export default memo(ImageMesh);
