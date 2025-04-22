import { formatPrice, generateAmountOption } from "../utils";
import { useDispatch } from "react-redux";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { loginUser } from "../features/user/userSlice";

const CartItem = ({ cartItems }) => {
  const dispatch = useDispatch();

  const removeItemHandler = (cartID) => {
    dispatch(removeItem({ cartID }));
  };

  const handleAmount = (e) => {
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  };

  const { cartID, title, price, image, amount, company, productColor } =
    cartItems;

  return (
    <article
      key={cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-40">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{title}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        {/* COLOR */}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color:{" "}
          <span
            className="badge badge-sm"
            style={{ background: productColor }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text"> Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOption(20)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={() => removeItemHandler(cartID)}
        >
          Remove
        </button>
      </div>
      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
