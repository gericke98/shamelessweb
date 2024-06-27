import React from "react";

const Pagination = () => {
  return (
    <div className="p-2 flex justify-between mb-20 lg:mb-0">
      <button
        disabled
        className="py-1 px-2 cursor-pointer disabled:cursor-not-allowed lg:text-base text-sm"
      >
        Previous
      </button>
      <button className="py-1 px-2 cursor-pointer disabled:cursor-not-allowed lg:text-base text-sm">
        Next
      </button>
    </div>
  );
};

export default Pagination;
