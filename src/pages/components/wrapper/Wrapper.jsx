import React from "react";
import "./Wrapper.css";

const Wrapper = (props) => {
  let classes = "wrapper " + props.className;
  return <div className={classes}>{props.children}</div>;
};

export default Wrapper;
