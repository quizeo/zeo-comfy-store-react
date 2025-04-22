import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  ComplexPaginationContainer,
  OrdersList,
  PaginationContainer,
  SectionTitle,
} from "../components";
const url = "/orders";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.error("Please login to view your orders");
      return redirect("/login");
    }

    const params = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      console.log(response);

      const orders = response.data.data;
      const meta = response.data.meta;

      return { orders, meta };
    } catch (error) {
      if (error.response?.status === 401 || 403) {
        toast.error("Please login to place an order");
        return redirect("/login");
      }

      if (error.response?.status === 400) {
        toast.error("Invalid request, please check your input");
        return null;
      }

      const errorMessage =
        error?.response?.data?.message ||
        "There was an error placing your order";

      toast.error(errorMessage);

      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();

  console.log(meta);

  if (meta.pagination.total < 1) {
    return <SectionTitle title="No orders found" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};

export default Orders;
