import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { notify } from "../../utils/notify";
import { queryParser } from "../../utils/queryParser";
import { USERS_URL } from "../../constans";
import { toTitleCase } from "../../utils/strings";

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;

  const title = "Manage Users";

  const fetchUsers = async () => {
    const query = queryParser({ page, limit });
    try {
      const response = await axios.get(`${USERS_URL}/profiles?${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setPagination(response.data.pagination);
      if (response.data.data.length === 0) {
        setError({ code: 404, message: "No users found." });
        setLoading(false);
        return;
      }
      setError(null);
      setData(response.data.data);
    } catch (error) {
      let message;

      if (!error.response) message = error.message;
      else {
        if (error.response.status === 404) {
          setError({ code: 404, message: "No users found." });
        }
        message = toTitleCase(error.response?.data.error.message);
      }

      console.log("Error:", error.response?.data);
      notify("error", message);
    }
    setLoading(false);
  };

  const handleStatusChange = async (_id, isBlocked) => {
    try {
      await axios.patch(
        `${USERS_URL}/profile/${_id}`,
        { isBlocked },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Update the user status in the UI
      const updatedData = data.map((user) =>
        user._id === _id ? { ...user, isBlocked } : user
      );
      setData(updatedData);

      notify("success", "Status updated successfully.");
    } catch (error) {
      let message;

      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.error.message);

      console.log("Error:", error.response?.data);
      notify("error", message);
    }
  };

  useEffect(() => {
    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const paginationHeader = (
    <div className="flex justify-center items-center mb-4">
      <div htmlFor="limit" className="label mr-2">
        <span className="label-text">Profiles per page:</span>
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
      <Container>
        <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
        {paginationHeader}
        <div className="overflow-x-auto mt-8">
          <table className="table">
            {/* Header */}
            <thead className="text-base">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic Rows */}
              {data.map((user) => (
                <tr key={user._id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.role}</td>
                  <td>
                    <select
                      value={user.isBlocked.toString()}
                      className="select select-bordered select-sm"
                      onChange={(e) =>
                        handleStatusChange(user._id, e.target.value)
                      }
                    >
                      <option value="false">ACTIVE</option>
                      <option value="true">BLOCK</option>
                    </select>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/user/${user._id}`}
                        className="btn text-lg"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginationFooter}
      </Container>
    </>
  );
};

export default UserList;
