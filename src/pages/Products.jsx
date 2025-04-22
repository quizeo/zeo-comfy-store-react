import React from "react";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils/index.jsx";
import { useLoaderData } from "react-router-dom";

const url = "/products";

const allProductsQuery = (params) => {
  const { category, sort, search, company, price, shipping, page } = params;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      sort ?? "a-z",
      company ?? "all",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const products = response.data.data;
    const meta = response.data.meta;

    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
