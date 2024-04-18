import Image from "next/image";
import React from "react";

const SingleProductPage = () => {
  return (
    <div className="flex gap-20 mt-5">
      <div className="basis-1/4">
        <div className="w-full h-[300px] relative rounded-sm overflow-hidden bg-[var(--primary-soft-color)] mb-5">
          <Image src="/" alt="product image" fill />
        </div>
        John Santiago
      </div>
      <div className="basis-3/4 bg-[var(--primary-soft-color)] p-5 rounded-sm font-bold text-white">
        <form className="flex flex-col gap-2">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="without shame"
            className="p-5 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)] "
          />
          <label className="text-sm">Description</label>
          <textarea
            name="description"
            placeholder="without shame description"
            className="p-5 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)]"
          />

          <label className="text-sm">Size</label>
          <select
            name="variant"
            id="variant"
            className="p-5 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)] "
          >
            <option value="SMALL">SMALL</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LARGE">LARGE</option>
            <option value="X-LARGE">X-LARGE</option>
          </select>
          <label className="text-sm">Price</label>
          <input
            type="number"
            name="price"
            placeholder="39"
            className="p-5 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)] "
          />

          <label className="text-sm">Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="10"
            className="p-5 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)] "
          />
          <button className="w-full p-5 bg-[teal] border-none text-white rounded-sm cursor-pointer mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
