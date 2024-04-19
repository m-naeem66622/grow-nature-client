import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toKebabCase } from "../utils/strings";
import { BASE_URL } from "../constans";

const ProductCard = ({ data, className = "" }) => {
  return (
    <div className={`card bg-base-100 shadow-xl w-80 ${className}`}>
      <figure className="aspect-square">
        <img
          src={
            data.src[0]?.startsWith("https:") || data.src[0]?.startsWith("http:")
              ? data.src[0]
              : `${BASE_URL}/api/v1/${data.src[0]}`
          }
          className="object-cover w-full h-full"
          alt={data.name}
        />
      </figure>
      <div className="card-body">
        <h2 title={data.name} className="card-title">
          <span className="truncate">{data.name}</span>
        </h2>
        <p className="truncate">{data.shortDesc}</p>
        <div className="card-actions flex justify-between items-end">
          <div className="card-actions">
            {data.categories?.map((category, index) => (
              <Link
                to={"/category/" + toKebabCase(category)}
                key={index}
                className="btn btn-xs text-base-100 btn-accent"
              >
                {category}
              </Link>
            ))}
          </div>
          <div className="card-actions">
            <Link to={"/product/" + data._id} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ProductCard;
