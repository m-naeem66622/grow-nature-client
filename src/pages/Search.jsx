import React, { useRef, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { queryParser } from "../utils/queryParser";
import { notify } from "../utils/notify";
import { IMAGE_RECOGNITION_URL, PRODUCTS_URL } from "../constans";

const Search = () => {
  const formRef = useRef(null);
  const [searchBy, setSearchBy] = useState("image");
  const [imageFile, setImageFile] = useState(null);
  const [pagination, setPagination] = useState({});
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchByText = async (e) => {
    e.preventDefault();
    const query = queryParser({ page, limit, name: searchText });

    setLoading(true);
    setSearchActive(true);
    try {
      const response = await axios.get(`${PRODUCTS_URL}?${query}`);
      setPagination(response.data.pagination);
      if (response.data.data.length === 0) {
        setError({ code: 404, message: "No products found." });
        setData([]);
        setLoading(false);
        return;
      }
      setError(null);
      setData(response.data.data);
    } catch (error) {
      console.error("Error while fetching products:", error);
      setError({ ...error.response.data, code: error.response.status });
      notify("error", "Error while fetching products");
    }
    setLoading(false);
  };

  const handleSearchByImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchActive(true);
    const formData = new FormData(formRef.current);

    const query = queryParser({ name: true, similar: true, size: "s" });

    console.log("formData", formData.get("image"));

    try {
      const response = await axios.post(
        `${IMAGE_RECOGNITION_URL}/upload?${query}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("response", response.data);

      setData(response.data);
    } catch (error) {
      console.error("Error while fetching similar images:", error);
      if (!error.response) {
        notify("error", "The server is not responding");
      } else {
        notify("error", error.response.data.error);
      }
    }
    setLoading(false);
  };

  const paginationHeader = (
    <div className="flex justify-center items-center mb-4">
      <div htmlFor="limit" className="label mr-2">
        <span className="label-text">Products per page:</span>
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

  return (
    <>
      <Container>
        <div className="flex justify-between items-center">
          <Heading level={1}>Search</Heading>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Search by: Text</span>
              <input
                type="checkbox"
                className="toggle"
                checked={searchBy === "image"}
                onChange={(e) =>
                  setSearchBy(e.target.checked ? "image" : "text")
                }
              />
              <span className="label-text ml-2">Image</span>
            </label>
          </div>
        </div>
        <div className="mb-6">
          {searchBy === "text" ? (
            <form onSubmit={handleSearchByText}>
              <label className="form-control w-full join-item">
                <div className="label">
                  <span className="label-text">Search by text</span>
                </div>
                <div className="join">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="input input-primary input-bordered join-item w-full"
                  />
                  <button className="btn btn-primary join-item">Search</button>
                </div>
              </label>
            </form>
          ) : (
            <>
              <label className="form-control w-full join-item">
                <div className="label">
                  <span className="label-text">Search by image</span>
                </div>
                <form
                  ref={formRef}
                  className="join"
                  onSubmit={handleSearchByImage}
                >
                  <input
                    type="file"
                    name="image"
                    className="file-input file-input-primary file-input-bordered join-item w-full"
                    accept="image/*"
                    onChange={(e) => {
                      setImageFile(e.target.files[0]);
                      setSearchActive(true);
                    }}
                  />
                  <button className="btn btn-primary join-item">Search</button>
                </form>
              </label>
              {/* Preview Image */}
              {imageFile && (
                <div className="flex justify-center items-center gap-4 mt-4">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="rounded-lg"
                    style={{ maxWidth: "300px" }}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {searchActive ? (
          error ? (
            <>
              {error.code === 404 && searchBy === "text" && paginationHeader}
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">
                  {error.code} Error
                </h2>
                <p className="text-gray-600">{error.message}</p>
              </div>
              {error.code === 404 && searchBy === "text" && paginationFooter}
            </>
          ) : (
            <>
              {searchBy === "text" && paginationHeader}
              {loading ? (
                <div className="text-center">
                  <span className="loading loading-dots loading-lg text-primary"></span>
                </div>
              ) : // Handle the conditional rendering searchBy
              searchBy === "text" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.map((product) => (
                    <ProductCard key={product._id} data={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 sm:gap-12">
                  {data.map((product) => (
                    // Show the name, images of the product
                    <div
                      key={product.id}
                      className="flex flex-col items-center justify-center gap-4"
                    >
                      <h2 className="text-2xl font-semibold">{product.name}</h2>
                      <div className="flex flex-wrap gap-4 justify-center items-center">
                        {product.similar.images.slice(0, 6).map((image) => (
                          <img
                            key={image}
                            src={`${product.similar.base_url}${image}`}
                            alt={product.name}
                            className="rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchBy === "text" && paginationFooter}
            </>
          )
        ) : searchBy === "text" ? (
          <div className="text-center">
            <span className="text-lg text-base-content">
              Please enter a search term to begin
            </span>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-lg text-base-content">
              Please upload an image to begin
            </span>
          </div>
        )}
      </Container>
    </>
  );
};

export default Search;
