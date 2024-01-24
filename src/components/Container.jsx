import React from "react";

const Container = ({ className = "", children }) => {
  const include_px = /px-\d+/.test(className);
  const updatedClassName = include_px ? className : `px-12 ${className}`;

  return (
    <div className={`${updatedClassName} max-w-[1440px] mx-auto`}>
      {children}
    </div>
  );
};

export default Container;
