import React from "react";

const Pagination = () => {
  return (
    <div className="p-2 flex justify-between">
      <button
        disabled
        className="py-1 px-2 cursor-pointer disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button className="py-1 px-2 cursor-pointer disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
