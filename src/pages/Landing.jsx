import React from "react";
import { FeaturedProducts, Hero } from "../components";

import { customFetch } from "../utils/index.jsx";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: async () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;

  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
