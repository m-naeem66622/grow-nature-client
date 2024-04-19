import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils/notify";
import { USERS_URL } from "../../constans";
import { formatTime } from "../../utils/strings";

const ProfileDetail = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${USERS_URL}/profile/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log("Error while fetching profile:", error.response?.data);
      let errorObj = {};
      if (!error.response)
        errorObj = { code: error.code, message: error.message };
      else errorObj = { ...error.response.data, code: error.response.status };
      setError(errorObj);
      notify("error", errorObj.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();

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
    <div className="container mx-auto p-6">
      <div className="card py-8 bordered">
        <figure>
          <img
            className="w-52 rounded-full"
            src="https://gravatar.com/avatar?s=500&d=mp"
            alt="User Avatar"
          />
        </figure>
        <div className="card-body">
          <div className="badge badge-lg badge-success mx-auto">
            {data.role}
          </div>
          <div
            className={`badge badge-lg mx-auto ${
              data.isBlocked ? "badge-error" : "badge-success"
            }`}
          >
            {data.isBlocked ? "BLOCKED" : "ACTIVE"}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="card-title">
              {data.firstName} {data.lastName}
            </h2>
            <p>{data.email}</p>
            {data.role === "CARETAKER" && (
              <>
                <em>{data.bio}</em>
              </>
            )}
          </div>
          <div className="divider divider-vertical"></div>
          <p>
            <strong className="mr-2">Address:</strong>
            {Object.values({
              ...data.address,
              createdAt: "",
              updatedAt: "",
            })
              .filter(Boolean)
              .join(", ")}
          </p>
          <p>
            <strong>Phone:</strong> {data.phoneNumber}
          </p>
          {data.role === "CARETAKER" && (
            <>
              <p>
                <strong>Speciality:</strong> {data.speciality}
              </p>
              <p className="flex">
                <strong>Experience:</strong>
                <ul className="list-disc ml-8">
                  {data.experience.map((experience, index) => (
                    <li key={index}>{experience}</li>
                  ))}
                </ul>
              </p>
              <p className="flex">
                <strong>Services:</strong>
                <ul className="list-disc ml-8">
                  {data.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </p>
              <p className="flex">
                <strong>Pricing:</strong>
                <ul className="list-disc ml-8">
                  {data.pricing.map((pricing, index) => (
                    <li key={index}>
                      {pricing.service} - PKR {pricing.price}/-
                    </li>
                  ))}
                </ul>
              </p>
              <p className="flex">
                <strong>Availability:</strong>
                <ul className="list-disc ml-8">
                  {data.availability.map((available, index) => (
                    <li key={index}>
                      {available.day} | {formatTime(available.start)} -{" "}
                      {formatTime(available.end)}
                    </li>
                  ))}
                </ul>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
