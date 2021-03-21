import React, { memo } from "react";
import "./Spinner.scss";

const Spinner = ({ open = false, text }) => {
  if (!open) return null;

  return (
    <div className="Spinner">
      <div className="Spinner__icon" />
      {text && <span className="Spinner__text">{text}</span>}
    </div>
  );
};

export default memo(Spinner);
