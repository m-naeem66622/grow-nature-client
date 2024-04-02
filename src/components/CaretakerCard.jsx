import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CaretakerCard = ({ data, className = "" }) => {
  return (
    <div className="card card-bordered shadow-xl w-[400px] max-w-md">
      <div className="card-body text-base-content text-base">
        <p className="card-title">{`${data.firstName} ${data.lastName}`}</p>
        <div className="flex gap-x-4 items-center" title="Email">
          <i class="fa-solid fa-envelope"></i>
          {data.email}
        </div>
        <div className="flex gap-x-4 items-center" title="Phone Number">
          <i class="fa-solid fa-phone"></i>
          {data.phoneNumber}
        </div>
        <div className="flex gap-x-4 items-center" title="Address">
          <i class="fa-solid fa-location-dot"></i>
          {`${data.address.city}, ${data.address.state}, ${data.address.country}`}
        </div>
        <div className="flex gap-x-4 items-center" title="Speciality">
          <i class="fa-solid fa-pen"></i>
          {data.speciality}
        </div>
        <div className="card-actions justify-end">
          <Link to={`/caretaker/${data._id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
        <div className="flex gap-x-2 gap-y-1 flex-wrap" title="Specialization">
          {data.services.map((service, index) => (
            <div key={index} className="badge badge-ghost badge-outline">
              #{service}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CaretakerCard.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default CaretakerCard;
