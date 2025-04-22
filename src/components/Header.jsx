import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
  };

  const user = useSelector((state) => {
    return state.userState.user;
  });

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center items-center sm:justify-end ">
        {/* {USER} */}
        {user ? (
          <div className="flex items-center gap-x-2 sm:gap-x-8">
            <p className="text-xs sm:text-sm"> Hello, {user.user.username}</p>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-primary"
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
        {/* {LINK} */}
      </div>
    </header>
  );
};

export default Header;
