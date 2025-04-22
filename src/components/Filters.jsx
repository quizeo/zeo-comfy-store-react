import React from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { companies, categories } = meta;
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sn"
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        size="select-sm"
        list={categories}
        defaultValue={category}
      />

      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        size="select-sm"
        list={companies}
        defaultValue={company}
      />
      {/* PRICE RANGE */}
      <FormRange
        name="price"
        label="select price"
        range="range-sm"
        price={price}
      />
      {/* ORDERS */}
      <FormSelect
        label="sort by"
        name="order"
        size="select-sm"
        list={["a-z", "z-a", "price-lowest", "price-highest"]}
        defaultValue={order}
      />
      {/* SHIPPING */}
      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />

      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm capitalize">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm capitalize">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
