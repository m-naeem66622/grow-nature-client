import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { notify } from "../../utils/notify";
import { queryParser } from "../../utils/queryParser";
import { APPOINTMENTS_URL } from "../../constans";
import { toTitleCase } from "../../utils/strings";
import AppointmentEditModal from "./AppointmentEditModal";

const AppointmentList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;
  const [appointment, setAppointment] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const title = "Your Appointments";

  const fetchAppointments = async () => {
    const query = queryParser({ page, limit });
    try {
      const response = await axios.get(`${APPOINTMENTS_URL}?${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setPagination(response.data.pagination);
      if (response.data.data.length === 0) {
        setError({ code: 404, message: "No Caretakers found." });
        setLoading(false);
        return;
      }
      setError(null);
      setData(response.data.data);
    } catch (error) {
      let message;

      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.error.message);

      console.log("Error:", error.response?.data);
      notify("error", message);
    }
    setLoading(false);
  };

  const updateExistingData = (updatedAppointment) => {
    const updatedData = data.map((appointment) =>
      appointment._id === updatedAppointment._id
        ? updatedAppointment
        : appointment
    );
    setData(updatedData);
  };

  useEffect(() => {
    fetchAppointments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  useEffect(() => {
    if (isOpen) {
      modalRef.current.showModal();
    }

    if (!modalRef.current) {
      setIsOpen(false);
      setAppointment({});
    }
  }, [isOpen, modalRef]);

  const paginationHeader = (
    <div className="flex justify-center items-center mb-4">
      <div htmlFor="limit" className="label mr-2">
        <span className="label-text">Appointments per page:</span>
      </div>
      <select
        id="limit"
        className="select select-sm select-primary"
        value={limit}
        onChange={(e) => {
          setSearchParams({ page, limit: e.target.value });
        }}
      >
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
      </select>
    </div>
  );

  const paginationFooter = (
    <div className="flex justify-center items-center mt-4 gap-x-2">
      <button
        className="btn btn-primary text-lg"
        onClick={() => {
          setSearchParams({ page: parseInt(page) - 1, limit });
        }}
        disabled={page <= 1}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <span className="text-lg font-semibold text-base-content">
        Page {page} of {pagination.totalPages}
      </span>
      <button
        className="btn btn-primary text-lg"
        onClick={() => {
          setSearchParams({ page: parseInt(page) + 1, limit });
        }}
        disabled={page >= pagination.totalPages}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
        {error.code === 404 && pagination.totalUsers > 0 && paginationHeader}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            {error.code} Error
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
        {error.code === 404 && pagination.totalUsers > 0 && paginationFooter}
      </Container>
    );
  }

  return (
    <>
      {isOpen && (
        <AppointmentEditModal
          modalRef={modalRef}
          setIsOpen={setIsOpen}
          updateData={updateExistingData}
          data={appointment}
        />
      )}
      <Container>
        <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
        {paginationHeader}
        <div className="max-w-xl mx-auto">
          <div className="grid gap-6">
            {data.map((appointment, index) => (
              <div
                key={index}
                className="bg-neutral-content shadow-md rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <p className="text-lg font-semibold mb-2 text-neutral">
                    {appointment.purpose}
                  </p>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-700">
                      Status: {appointment.status}
                    </p>
                    <p className="text-gray-700">
                      Caretaker:{" "}
                      <Link
                        className="link"
                        to={`/caretaker/${appointment.caretaker._id}`}
                      >
                        {appointment.caretaker.firstName}{" "}
                        {appointment.caretaker.lastName}
                      </Link>
                    </p>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Start Time: {new Date(appointment.start).toLocaleString()}
                  </p>
                  <p className="text-gray-700 mb-2">
                    End Time: {new Date(appointment.end).toLocaleString()}
                  </p>
                  <div className="flex justify-end gap-x-2">
                    <button className="btn btn-sm bg-red-500 text-white border-0">
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setIsOpen(true);
                        setAppointment(appointment);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {paginationFooter}
      </Container>
    </>
  );
};

export default AppointmentList;
