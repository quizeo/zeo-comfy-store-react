import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

export const action =
  (store) =>
  async ({ request, queryClient }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    // Check if user is logged in before attempting checkout
    if (!user) {
      toast.error("Please login to place an order", {
        hideProgressBar: true,
        icon: false,
      });
      return redirect("/login");
    }

    const { cartItems, cartTotal, numItemsInCart, orderTotal } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: cartTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await customFetch.post(
        "/orders",
        {
          data: info,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      store.dispatch(clearCart());

      toast.success("Order placed successfully", {
        hideProgressBar: true,
        icon: false,
      });

      return redirect("/orders");
    } catch (error) {
      console.log("Checkout error:", error);

      // Fix the logical OR condition
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Please login to place an order", {
          hideProgressBar: true,
          icon: false,
        });
        return redirect("/login");
      }

      if (error.response?.status === 400) {
        toast.error("Invalid request, please check your input", {
          hideProgressBar: true,
          icon: false,
        });
        return null;
      }

      toast.error("There was an error placing your order", {
        hideProgressBar: true,
        icon: false,
      });

      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize"> Shipping Information</h4>
      <FormInput label="first name" type="text" name="name" />
      <FormInput label="address" type="text" name="address" />
      <div className="mt-4">
        <SubmitBtn text="place your order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
