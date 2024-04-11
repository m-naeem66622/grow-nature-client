import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Heading from "../../components/Heading";
import { notify } from "../../utils/notify";
import { APPOINTMENTS_URL } from "../../constans";
import Container from "../../components/Container";

const AppointmentDetail = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${APPOINTMENTS_URL}/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log("Error while fetching appointment:", error.response?.data);
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
    <>
      <Container>
        <Heading className="mb-6">Appointment Details</Heading>
        <div className="card card-bordered max-w-xl mx-auto bg-neutral-content shadow-lg overflow-hidden">
          <div className="px-6 py-4 text-neutral">
            <div className="flex justify-between mb-4">
              <div className="w-1/2">
                <p className="font-bold mb-2">Purpose:</p>
                <p className="">{data.purpose}</p>
              </div>
              <div className="w-1/2">
                <p className="font-bold mb-2">Status:</p>
                <p className="">{data.status}</p>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="w-1/2">
                <p className="font-bold mb-2">Start Time:</p>
                <p className="">
                  {new Date(data.start).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              <div className="w-1/2">
                <p className="font-bold mb-2">End Time:</p>
                <p className="">
                  {new Date(data.end).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
            {/* Customer Details */}
            {userInfo.role === "CARETAKER" && (
              <div className="mb-4">
                <p className="font-bold mb-2">Customer:</p>
                <p className="">
                  Name: {data.customer.firstName} {data.customer.lastName}
                </p>
                <p className="">Email: {data.customer.email}</p>
                <p className="">Phone Number: {data.customer.phoneNumber}</p>
                <p className="">
                  Address: {data.customer.address.street},{" "}
                  {data.customer.address.city}, {data.customer.address.state},{" "}
                  {data.customer.address.country}
                </p>
              </div>
            )}
            {/* Caretaker Details */}
            {userInfo.role === "BUYER" && (
              <div>
                <p className="font-bold mb-2">Caretaker:</p>
                <p className="">
                  Name: {data.caretaker.firstName} {data.caretaker.lastName}
                </p>
                <p className="">Email: {data.caretaker.email}</p>
                <p className="">Phone Number: {data.caretaker.phoneNumber}</p>
                <p className="">
                  Address: {data.caretaker.address.street},{" "}
                  {data.caretaker.address.city}, {data.caretaker.address.state},{" "}
                  {data.caretaker.address.country}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default AppointmentDetail;
