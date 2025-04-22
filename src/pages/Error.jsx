import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  if (error.status === 404) {
    return (
      <main className="flex h-screen justify-center items-center">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not Found
          </h1>
          <p className="mt-6 text-lg leading-7">
            Sorry, we couln't find the page you're looking for.
          </p>
          <div className="mt-10">
            <Link to="/" className="btn btn-secondary">
              GO BACK HOME
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen justify-center items-center">
      <h4 className="text-center font-bold text-4xl">There was an error</h4>
    </main>
  );
};

export default Error;
