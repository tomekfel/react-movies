import React from "react";
import "./LoadMoreBtn.css";

const LoadMoreBtn = props => {
  return (
    <button className="rmdb-loadmorebtn" onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default LoadMoreBtn;
