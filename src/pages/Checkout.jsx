import React from "react";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Please login to access the checkout page");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);

  if (cartItems.length === 0) {
    return <SectionTitle text=" Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
