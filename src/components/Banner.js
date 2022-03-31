import React from "react";

const Banner = () => {
  return (
    <img
      className="banner"
      src={process.env.PUBLIC_URL + "amsterdamphp-raffler-logo.png"}
      alt="AmsterdamPHP raffler 2.0"
    />
  )
}

export default Banner