import PropTypes from "prop-types";

const Container = ({ className = "", children }) => {
  const include_px = /px-\d+/.test(className);
  const updatedClassName = include_px ? className : `px-12 ${className}`;

  return (
    <div className={`${updatedClassName} max-w-[1440px] mx-auto`}>
      {children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Container;
