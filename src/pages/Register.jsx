import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { BsJournalMedical } from "react-icons/bs";
import { toast } from "react-toastify";
import { customFetch } from "../utils";

export const action = async ({ request }) => {
  console.log(request);

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("Registration successful", {
      icon: false,
      hideProgressBar: true,
    });
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Please double check your credentials";

    toast.error(errorMessage, { icon: false, hideProgressBar: true });
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h1 className="text-center text-3xl font-bold"> Register</h1>
        <FormInput
          label="username"
          name="username"
          type="text"
          defaultValue="john zeo"
        />
        <FormInput
          label="email"
          name="email"
          type="email"
          defaultValue="zeo@gmail.com"
        />
        <FormInput
          label="password"
          name="password"
          type="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="register" />
          <p className="mt-3 text-center">
            Already a member?
            <Link
              to="/login"
              className="ml-2 link link-hover link-primary capitalize"
            >
              login
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};

export default Register;
