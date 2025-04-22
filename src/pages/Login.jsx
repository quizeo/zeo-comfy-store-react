import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/local", data);

      store.dispatch(loginUser(response.data));
      toast.success("Login successfully");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuest = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h1 className="text-center text-3xl font-bold "> Login</h1>
        <FormInput
          label="Email"
          name="identifier"
          type="identifier"
          defaultValue="zeo@gmail.com"
        />
        <FormInput
          label="password"
          name="password"
          type="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="Login" />
          <button
            type="button"
            className="mt-3 btn btn-secondary btn-block"
            onClick={() => loginAsGuest()}
          >
            Guest User
          </button>
          <p className="mt-3 text-center">
            Not a member?
            <Link
              to="/register"
              className="ml-2 link link-hover link-primary capitalize"
            >
              register
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};

export default Login;
