import React from "react";

const Color = (props) => {
  const { color } = props;
  return (
    <>
      <li style={{ backgroundColor: `${color}` }}></li>
    </>
  );
};

export default Color;
