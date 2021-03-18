import React, { memo, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import shortid from "shortid";
import "./ImageMesh.scss";

const ImageMesh = ({ images = [], depth }) => {
  const id = useMemo(() => shortid.generate(), []);
  const size = Math.pow(4, depth) / Math.pow(2, depth);

  const matrix = new Array(size).fill(0).map((_, i) => {
    const s = i * Math.pow(2, depth);
    const e = (i + 1) * Math.pow(2, depth);

    return images.slice(s, e);
  });

  return (
    <div className="ImageMesh">
      <div className="ImageMesh__image">
        {matrix.map((row, i) => (
          <TransitionGroup className="ImageMesh__row" key={`${id} ${i}`} appear>
            {row.map((image) => (
              <CSSTransition
                key={image.key}
                in={true}
                timeout={300}
                classNames="image-gap"
              >
                <img
                  className="ImageMesh__fragment"
                  src={image.src}
                  alt="Fragment"
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ))}
      </div>
    </div>
  );
};

export default memo(ImageMesh);
