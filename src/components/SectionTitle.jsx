import React from "react";

const SectionTitle = ({ text }) => {
  return (
    <div className="border-b border-base-300 pb-5">
      <div className="h2 text-3xl font-medium tracking-wider capitalize">
        {text}
      </div>
    </div>
  );
};

export default SectionTitle;
