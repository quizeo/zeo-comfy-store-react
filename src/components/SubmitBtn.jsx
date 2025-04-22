import React from "react";
import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigate = useNavigation();
  console.log(navigate.state);

  const isSubmiting = navigate.state === "submitting";

  return (
    <button
      className="btn btn-primary btn-block capitalize "
      disabled={isSubmiting}
    >
      {isSubmiting ? (
        <span className="loading loading-spinner loading-sm">sending...</span>
      ) : (
        text || "Submit"
      )}
    </button>
  );
};

export default SubmitBtn;
