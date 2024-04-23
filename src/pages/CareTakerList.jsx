import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CaretakerCard from "../components/CaretakerCard";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { notify } from "../utils/notify";
import { queryParser } from "../utils/queryParser";
import { USERS_URL } from "../constans";

const CaretakerList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;

  const title = "Services Profiles";

  const fetchUsers = async () => {
    const query = queryParser({ page, limit });
    try {
      const response = await axios.get(
        `${USERS_URL}/profiles/caretaker?${query}`
      );
      setPagination(response.data.pagination);
      if (response.data.data.length === 0) {
        setError({ code: 404, message: "No Caretakers found." });
        setLoading(false);
        return;
      }
      setError(null);
      setData(response.data.data);
    } catch (error) {
      console.error("Error while fetching caretakers:", error);
      setError({ ...error.response.data, code: error.response.status });
      notify("error", "Error while fetching caretakers");
    }
    setLoading(false);
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
    <Container>
      <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
      {paginationHeader}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
        {data.map((caretaker) => (
          <CaretakerCard key={caretaker._id} data={caretaker} />
        ))}
      </div>
      {paginationFooter}
    </Container>
  );
};

export default CaretakerList;
