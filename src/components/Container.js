import React, { useEffect, useState } from "react";

const Container = (props) => {
  const [container, setContainer] = useState(window.innerWidth > 1320 ? "container-fluid" : "container-xxl container-xl container-lg container-md container-sm container");
  useEffect(() => {
    function handleResize() {
      setContainer(window.innerWidth > 1320 ? "container-fluid" : "container-xxl container-xl container-lg container-md container-sm container");
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section className={props.class1}>
      <div className={container} style={{padding: `${window.innerWidth > 1320 ? "0 100px" : "0"}`}} >{props.children}</div>
    </section>
  );
};

export default Container;
