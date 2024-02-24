import PropTypes from "prop-types";

const Heading = ({ level = 1, className = "", children }) => {
  const HeadingTag = `h${level}`;

  const headingClasses = {
    h1: "text-2xl lg:text-3xl font-bold leading-tight",
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

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Heading;
