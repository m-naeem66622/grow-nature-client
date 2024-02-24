import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ data, className = "" }) => {
  return (
    <div className={`card bg-base-100 shadow-/xl w-80 ${className}`}>
      <figure className="aspect-square">
        <img
          src={data.src[0]}
          className="object-cover w-full h-full"
          alt="Shoes"
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
              <button
                key={index}
                className="btn btn-xs text-base-100 btn-accent"
              >
                {category}
              </button>
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
