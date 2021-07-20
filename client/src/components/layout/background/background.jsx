import React, { useState } from "react";
import "./background.css";
import background from "../../../assets/img/main-bg.jpg";

const Background = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg">
      <img
        className="img fade-in"
        style={loaded ? {} : { display: "none" }}
        src={background}
        alt=""
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default Background;
