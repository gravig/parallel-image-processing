import React, { memo } from "react";
import { CSSTransition } from "react-transition-group";
import Spinner from "../../Spinner/Spinner";

const ImageFragment = ({ fragment }) => {
  return (
    <CSSTransition
      key={fragment.key}
      in={fragment.isLoading}
      timeout={300}
      classNames="image-gap"
    >
      <div className="ImageMesh__fragment">
        <img
          className="fragment__image"
          src={fragment.image.src}
          alt="Fragment"
        />
        <Spinner open={fragment.isLoading} />
      </div>
    </CSSTransition>
  );
};

export default memo(ImageFragment);
