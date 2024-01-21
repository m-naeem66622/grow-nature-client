import React from "react";

const Container = ({ className, children }) => {
  return (
    <div className={`${className || ""} max-w-[1440px] px-12 mx-auto`}>
      {children}
    </div>
  );
};

export default Container;
