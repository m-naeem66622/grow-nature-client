import React from "react";
import dummyData from "../dummyData";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useLocation } from "react-router-dom";
import { toTitleCase } from "../utils/strings";
import Heading from "../components/Heading";

const ProductList = () => {
  const location = useLocation();
  const { pathname } = location;

  const paths = pathname.split("/").filter(Boolean);
  const path_1 = paths[0];
  const path_2 = paths[1] ? ` - ${toTitleCase(paths[1])}` : "";
  const title =
    path_1 === "products" ? "All Products" : `${toTitleCase(path_1)}${path_2}`;

  return (
    <Container>
      <Heading className="text-4xl font-bold mb-8 mt-4">{title}</Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {dummyData.plants.map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
