import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { notify } from "../utils/notify";
import { queryParser } from "../utils/queryParser";
import { PLANT_SWAPS_URL } from "../constans";
import { toTitleCase } from "../utils/strings";
import { useSelector } from "react-redux";

const PlantSwapList = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;

  const title = "My Plant Swaps";

  const fetchPlantSwaps = async () => {
    const query = queryParser({ page, limit });
    try {
      const response = await axios.get(`${PLANT_SWAPS_URL}/?${query}`);
      setPagination(response.data.pagination);
      if (response.data.data.length === 0) {
        setError({ code: 404, message: "No plant swaps found." });
        setLoading(false);
        return;
      }
      setError(null);
      setData(response.data.data);
    } catch (error) {
      let message;

      if (!error.response) message = error.message;
      else message = toTitleCase(error.response?.data.error.message);

      if (error.response?.status !== 400) {
        setError({ code: error.response?.status, message });
      }

      console.log("Error:", error.response?.data);
      notify("error", message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlantSwaps();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const paginationHeader = (
    <div className="flex justify-center items-center mb-4">
      <div htmlFor="limit" className="label mr-2">
        <span className="label-text">Plant Swaps per page:</span>
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
        <div className="flex justify-between">
          <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
          <Link to="/plant-swaps/create" className="btn btn-primary">
            Create Plant Swap
          </Link>
        </div>
        {error.code === 404 &&
          pagination.totalPlantSwaps > 0 &&
          paginationHeader}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            {error.code} Error
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
        {error.code === 404 &&
          pagination.totalPlantSwaps > 0 &&
          paginationFooter}
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="flex justify-between">
          <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
          <Link to="/user/plant-swaps/create" className="btn btn-primary">
            Create Plant Swap
          </Link>
        </div>
        {paginationHeader}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((plantSwap) => (
            <div
              key={plantSwap._id}
              className="bg-neutral-content text-neutral shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-4 flex flex-col justify-between h-full">
                <p className="text-lg font-semibold mr-2">Seeker:</p>
                <ul className="list-disc ml-8">
                  <li>
                    {plantSwap.user.firstName} {plantSwap.user.lastName}
                  </li>
                  <li>Email: {plantSwap.user.email}</li>
                  <li>Phone: {plantSwap.user.phoneNumber}</li>
                </ul>
                {/* Offered Plants  */}
                <p className="font-semibold text-lg">Offered Plants</p>
                <ul className="list-decimal ml-8">
                  {plantSwap.offeredPlants.map((plant) => (
                    <li key={plant._id} className="">
                      <div className="flex justify-between">
                        <Link to={`/product/${plant._id}`} className="link">
                          {plant.name}
                        </Link>
                        <p className="text-gray-600 mb-2 lg:text-lg">
                          {plant.price.currency} {plant.price.amount}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="font-semibold text-lg">Desired Plants</p>
                <ul className="list-decimal ml-8">
                  {plantSwap.desiredPlants.map((plant) => (
                    <li key={plant._id} className="">
                      <div className="flex justify-between">
                        <Link to={`/product/${plant._id}`} className="link">
                          {plant.name}
                        </Link>
                        <p className="text-gray-600 mb-2 lg:text-lg">
                          {plant.price.currency} {plant.price.amount}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end gap-x-2">
                  {userInfo ? (
                    <button className="btn btn-sm btn-primary">
                      Make a Deal
                    </button>
                  ) : (
                    <Link
                      to="/login?redirect=/plant-swaps"
                      className="btn btn-sm btn-primary"
                    >
                      Login to Make a Deal
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {paginationFooter}
      </Container>
    </>
  );
};

export default PlantSwapList;
