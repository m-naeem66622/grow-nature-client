import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Container from "../components/Container";
import { formatTime } from "../utils/strings";
import { USERS_URL } from "../constans";
import { notify } from "../utils/notify";

const CaretakerDetail = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${USERS_URL}/profile/caretaker/${_id}`);
      // console.log(response.data);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching profile:", error);
      setError({ ...error.response.data, code: error.response.status });
      setLoading(false);
      notify("error", "Error while fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          {error.code} Error
        </h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  return (
    <Container className="">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{`${data.role} Profile`}</div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{`${data.firstName} ${data.lastName}`}</h2>
          </div>
          <p className="mt-2 text-gray-500">{data.bio}</p>
          <div className="mt-4">
            <p className="text-gray-700">
              <strong>Email:</strong> {data.email}
              <br />
              <strong>Phone:</strong> {data.phoneNumber}
              <br />
              <strong>Location:</strong>{" "}
              {`${data.address.city}, ${data.address.state}, ${data.address.country}`}
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <svg
              className="fill-current text-gray-600 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C7.7 0 4 3.7 4 8c0 4.3 8 16 8 16s8-11.7 8-16c0-4.3-3.7-8-8-8zm0 11.5c-1.6 0-3-1.4-3-3s1.4-3 3-3 3 1.4 3 3-1.4 3-3 3z" />
            </svg>
            <p className="text-gray-700 text-base ml-2">{data.speciality}</p>
          </div>
        </div>
        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Services Offered
          </h3>
          <ul className="mt-4">
            {data.pricing.map((service) => (
              <li key={service._id} className="flex justify-between py-2">
                <span className="text-gray-700">{service.service}</span>
                <span className="text-gray-700">Price: ${service.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-gray-800">Availability</h3>
          <ul className="mt-4">
            {data.availability.map((slot) => (
              <li key={slot._id} className="flex justify-between py-2">
                <span className="text-gray-700">{slot.day}</span>
                <span className="text-gray-700">
                  {formatTime(slot.start)} - {formatTime(slot.end)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-8 py-4">
          {userInfo ? (
            <button className="btn btn-primary">Get Appointment</button>
          ) : (
            <>
              <p className="text-gray-700">
                <em>Please login to book an appointment</em>
              </p>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CaretakerDetail;
