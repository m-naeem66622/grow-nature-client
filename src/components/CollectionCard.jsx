import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toKebabCase } from "../utils/strings";

const CollectionCard = ({ data }) => {
  return (
    <div className="relative before:absolute before:content-[''] before:hover:bg-black before:w-full before:h-full before:opacity-0 before:hover:opacity-75 before:transition-opacity before:duration-300 before:rounded-lg before:inset-0">
      <div className="rounded-lg shadow-lg aspect-reel">
        <img
          src={data.src}
          alt={data.name}
          className="h-full object-cover rounded-lg"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 text-center px-3">
        <h3 className="text-white text-2xl font-bold mb-2">{data.name}</h3>
        <p className="text-gray-400 text-lg mb-4">{data.desc}</p>
        <Link
          to={"/collection/" + toKebabCase(data.name)}
          className="btn btn-primary"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
};

CollectionCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CollectionCard;
