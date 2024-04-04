import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { toTitleCase } from "../utils/strings";
import { notify } from "../utils/notify";
import { queryParser } from "../utils/queryParser";
import { PRODUCTS_URL } from "../constans";
import staticData from "../staticData";

const ProductList = () => {
  const location = useLocation();
  const params = useParams();
  const { pathname } = location;
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;

  const title = pathname.startsWith("/products")
    ? "All Products"
    : pathname.startsWith("/collection")
    ? staticData.collections.find(
        (elem) => elem.value.join(",") === params.collectionName
      )
      ? staticData.collections.find(
          (elem) => elem.value.join(",") === params.collectionName
        ).name
      : staticData.storeItems.find(
          (elem) => elem.value === params.collectionName
        ).name
    : params.categoryName
        ?.split(",")
        .filter(Boolean)
        .map((elem) => toTitleCase(elem))
        .join(", ");

  const fetchProducts = async () => {
    const categories = pathname.startsWith("/collection")
      ? params.collectionName?.split(",").map((elem) => toTitleCase(elem))
      : params.categoryName?.split(",").map((elem) => toTitleCase(elem));

    const query = queryParser({
      page,
      limit,
      categories,
    });

    try {
      const response = await axios.get(`${PRODUCTS_URL}?${query}`);
      setPagination(response.data.pagination);
      if (response.data.data.length === 0) {
        setError({ code: 404, message: "No products found." });
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

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, params.collectionName, params.categoryName]);

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
        {error.code === 404 && pagination.totalProducts > 0 && paginationHeader}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            {error.code} Error
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
        {error.code === 404 && pagination.totalProducts > 0 && paginationFooter}
      </Container>
    );
  }

  return (
    <Container>
      <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>
      {paginationHeader}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {data.map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </div>
      {paginationFooter}
    </Container>
  );
};

export default ProductList;
