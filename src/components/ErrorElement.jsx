import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log();

  return <h2>{error.message}</h2>;
};

export default ErrorElement;
