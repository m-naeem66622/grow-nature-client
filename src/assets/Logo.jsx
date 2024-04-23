import PropTypes from "prop-types";
import IMAGE_LOGO from "../assets/Logo.jpeg";

function Logo({ className }) {
  return (
    <div className={`${className} overflow-hidden`}>
      <img src={IMAGE_LOGO} alt="" />
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
