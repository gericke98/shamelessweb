import React from "react";

const AddUsersPage = () => {
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm mt-5">
      <form action="" className="flex flex-wrap justify-between gap-2">
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          className="p-6 w-2/5 bg-transparent border-2 border-[#2e374a]"
        />
        <select
          id="sizeSelector"
          className="p-6 w-2/5 bg-transparent rounded-sm  border-2 border-[#2e374a]"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
        <textarea
          placeholder="Description"
          name="description"
          required
          className="p-6 w-full bg-transparent border-2 border-[#2e374a]"
        />
        <select
          id="sizeSelector"
          className="p-6 w-2/5 bg-transparent rounded-sm  border-2 border-[#2e374a]"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xlarge">X-Large</option>
        </select>

        <input
          type="text"
          placeholder="Price"
          name="price"
          required
          className="p-6 w-2/5 bg-transparent border-2 border-[#2e374a]"
        />
        <input
          type="text"
          placeholder="Stock"
          name="stock"
          required
          className="p-6 w-2/5 bg-transparent border-2 border-[#2e374a]"
        />
        <button
          type="submit"
          className="w-full p-5 bg-[teal] cursor-pointer border-none rounded-sm mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUsersPage;
