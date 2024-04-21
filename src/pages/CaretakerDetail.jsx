import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Container from "../components/Container";
import { formatTime } from "../utils/strings";
import { USERS_URL } from "../constans";
import { notify } from "../utils/notify";
import AppointmentAddModal from "../components/AppointmentAddModal";
import ReviewAddModal from "../components/ReviewAddModal";
import ReviewEditModal from "../components/ReviewEditModal";
import Heading from "../components/Heading";

const CaretakerDetail = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addAppointmentModalRef = useRef();
  const addReviewModalRef = useRef();
  const editReviewModalRef = useRef();
  const [review, setReview] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${USERS_URL}/profile/caretaker/${_id}`);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching profile:", error);
      if (!error.response)
        setError({ code: error.code, message: error.message });
      else setError({ ...error.response.data, code: error.response.status });
      setLoading(false);
      notify("error", "Error while fetching profile");
    }
  };

  const updateExistingData = (updatedData, reviewIndex) => {
    setData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      if (reviewIndex === null || reviewIndex === undefined) {
        newData.reviews.push(updatedData);
        return newData;
      }
      newData.reviews[reviewIndex] = updatedData;
      return newData;
    });
  };

  useEffect(() => {
    if (isOpen) {
      editReviewModalRef.current.showModal();
    }

    if (!editReviewModalRef.current) {
      setIsOpen(false);
      setReview({});
    }
  }, [isOpen, editReviewModalRef]);

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
    <>
      <AppointmentAddModal
        caretaker={{ _id: data._id, services: data.services }}
        modalRef={addAppointmentModalRef}
      />
      <ReviewAddModal
        modalRef={addReviewModalRef}
        reviewTo={{ _id: data._id }}
        reviewFrom={userInfo._id}
        updateData={updateExistingData}
        reviewFor="caretaker"
      />
      {isOpen && (
        <ReviewEditModal
          modalRef={editReviewModalRef}
          review={review}
          reviewTo={{ _id: data._id }}
          setIsOpen={setIsOpen}
          updateData={updateExistingData}
          reviewFor="caretaker"
        />
      )}
      <Container className="">
        <div className="max-w-4xl py-6 mx-auto rounded-lg shadow-md overflow-hidden">
          <div className="px-8 mb-4">
            <div className="">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{`${data.role} Profile`}</div>
              <h2 className="block mt-1 text-lg leading-tight font-medium">{`${data.firstName} ${data.lastName}`}</h2>
            </div>
            <p className="mt-2">{data.bio}</p>
            <div className="mt-4">
              <p className="">
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
                className="fill-current h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C7.7 0 4 3.7 4 8c0 4.3 8 16 8 16s8-11.7 8-16c0-4.3-3.7-8-8-8zm0 11.5c-1.6 0-3-1.4-3-3s1.4-3 3-3 3 1.4 3 3-1.4 3-3 3z" />
              </svg>
              <p className="text-base ml-2">{data.speciality}</p>
            </div>
          </div>
          <div className="px-8 mb-4">
            <h3 className="text-xl font-semibold">Services Offered</h3>
            <ul className="mt-2">
              {data.pricing.map((service) => (
                <li key={service._id} className="flex justify-between py-2">
                  <span className="">{service.service}</span>
                  <span className="">Price: ${service.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-8 mb-4">
            <h3 className="text-xl font-semibold">Availability</h3>
            <ul className="mt-2">
              {data.availability.map((slot) => (
                <li key={slot._id} className="flex justify-between py-2">
                  <span className="">{slot.day}</span>
                  <span className="">
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-8">
            {userInfo ? (
              <div className="flex gap-x-2">
                <button
                  className="btn btn-primary"
                  onClick={() => addAppointmentModalRef.current.showModal()}
                >
                  Book Appointment
                </button>
                {(() => {
                  const reviewIndex = data.reviews.findIndex(
                    (rev) => rev.user._id === userInfo._id
                  );

                  return reviewIndex >= 0 ? (
                    <button
                      className="btn btn-primary w-fit"
                      onClick={() => {
                        setReview({
                          ...data.reviews[reviewIndex],
                          index: reviewIndex,
                        });
                        setIsOpen(true);
                      }}
                    >
                      Edit Review
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary w-fit"
                      onClick={() => {
                        addReviewModalRef.current.showModal();
                      }}
                    >
                      Give Review
                    </button>
                  );
                })()}
              </div>
            ) : (
              <>
                <p className="">
                  <em>Please login to book an appointment</em>
                </p>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <Heading level={2} className="text-center">
            Hear from our users
          </Heading>
          {data.reviews.length > 0 ? (
            data.reviews.map((review) => (
              <div
                key={review.id}
                className="shadow-lg p-4 mb-4 rounded-lg flex items-start"
              >
                <img
                  src={`https://gravatar.com/avatar?s=200&d=mp`}
                  alt={`${review.user.firstName} ${review.user.lastName}`}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium">
                    {review.user.firstName} {review.user.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{review.user.email}</p>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`fa fa-star ${
                          index < review.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      ></i>
                    ))}
                    <span className="ml-2 text-gray-600">
                      {review.rating} out of 5
                    </span>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Reviewed on{" "}
                    {new Date(review.updatedAt).toLocaleDateString()}{" "}
                    {review.createdAt !== review.updatedAt ? "(Edited)" : ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No reviews yet for this product.</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default CaretakerDetail;
