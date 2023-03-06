import React from "react";

const Color = (props) => {

  const {listColor} = props;
  return (
    <>
      <ul className="colors ps-0">
        {
          listColor.map(col=>(
            <li key={col} style={{backgroundColor: `${col}`}}></li>
          ))
        }
        
      </ul>
    </>
  );
};

export default Color;
