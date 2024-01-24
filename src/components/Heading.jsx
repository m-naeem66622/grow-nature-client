import React from "react";

const Heading = ({ level = 1, className = "", children }) => {
  const HeadingTag = `h${level}`;

  const headingClasses = {
    h1: "text-2xl font-bold leading-tight",
    h2: "text-xl font-bold leading-tight",
    h3: "text-lg font-bold leading-tight",
    h4: "text-base font-bold leading-tight",
    h5: "text-sm font-bold leading-tight",
    h6: "text-xs font-bold leading-tight",
  };

  return (
    <HeadingTag className={`${className} ${headingClasses[`h${level}`]}`}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
