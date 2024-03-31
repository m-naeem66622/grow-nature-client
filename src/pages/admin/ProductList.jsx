import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import ConfirmationModal from "../../components/ConfirmationModal";
import { notify } from "../../utils/notify";
import { toTitleCase } from "../../utils/strings";
import { BASE_URL, PRODUCTS_URL } from "../../constans";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;
  const [toDelete, setToDelete] = useState(null);
  const modalRef = useRef();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${PRODUCTS_URL}?page=${page}&limit=${limit}`
      );
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

  const handleDelete = async (_id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${PRODUCTS_URL}/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          notify("success", response.data.message);

          if (pagination.currentPage < pagination.totalPages) {
            fetchProducts();
          } else {
            setData(data.filter((p) => p._id !== _id));
            setPagination((prevState) => {
              const newTotalProducts = prevState.totalProducts - 1;
              return {
                ...prevState,
                totalProducts: newTotalProducts,
                currentProducts: prevState.currentProducts - 1,
                totalPages: Math.ceil(newTotalProducts / limit),
              };
            });

            if (pagination.currentProducts === 1) {
              setSearchParams({ page: page - 1, limit });
            }
          }

          resolve(); // Resolve the promise if the deletion was successful
        })
        .catch((error) => {
          let message;

          if (!error.response) message = error.message;
          else message = toTitleCase(error.response?.data.message);

          for (const key in error.response?.data.error) {
            setError(key, {
              type: "manual",
              message: error.response?.data.error[key],
            });
          }

          console.log("Error:", error.response?.data);
          notify("error", message);
          reject(error); // Reject the promise if the deletion failed
        });
    });
  };

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

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
      <>
        {error.code === 404 && paginationHeader}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            {error.code} Error
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
        {error.code === 404 && paginationFooter}
      </>
    );
  }

  return (
    <Container>
      <ConfirmationModal
        modalRef={modalRef}
        onConfirm={() => handleDelete(toDelete)}
        variant="delete"
      >
        <h3 className="font-bold text-lg">Delete Confirmation</h3>
        <p className="py-4">Are you sure you want to delete this product?</p>
      </ConfirmationModal>
      <Heading level={1} className="mb-8 mt-4">
        Products Management
      </Heading>
      {paginationHeader}
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* Header */}
          <thead className="text-base">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamic Rows */}
            {data.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <Link to={`/product/${product._id}`}>
                        <div className="mask mask-squircle w-16 h-16">
                          <img
                            src={
                              product.src[0].startsWith("https:")
                                ? product.src[0]
                                : `${BASE_URL}/api/v1/${product.src[0]}`
                            }
                            alt="Product"
                          />
                        </div>
                      </Link>
                    </div>
                    <div>
                      <div>{product.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {product.price.amount} {product.price.currency}
                </td>
                <td>{product.categories.join(", ")}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="btn text-lg"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                      className="btn btn-error text-white"
                      onClick={() => {
                        setToDelete(product._id);
                        modalRef.current.showModal();
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {paginationFooter}
    </Container>
  );
};

export default ProductList;
