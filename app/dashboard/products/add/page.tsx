import { addProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import React from "react";

const variants = [
  {
    name: "SMALL",
    stock: 0,
  },
  {
    name: "MEDIUM",
    stock: 0,
  },
  {
    name: "LARGE",
    stock: 0,
  },
  {
    name: "X-LARGE",
    stock: 0,
  },
];

const AddProductPage = () => {
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm mt-5">
      <form
        action={addProduct}
        className="flex flex-wrap justify-between gap-2"
      >
        <label className="text-lg">Name</label>
        <DashboardInput
          name={"name"}
          placeholder={"Name"}
          type="text"
          valueini={""}
        />
        <label className="text-lg">Description</label>
        <DashboardInput
          name={"description"}
          placeholder={"Insert description here"}
          type="textarea"
          valueini={""}
        />
        <label className="text-lg">Front image</label>
        <input
          type="file"
          accept="image"
          name="image"
          required
          className="p-6 w-full bg-transparent border-2 border-[#2e374a]"
        />
        <label className="text-lg">Back image</label>
        <input
          type="file"
          accept="image"
          name="image"
          required
          className="p-6 w-full bg-transparent border-2 border-[#2e374a]"
        />
        <label className="text-lg">Price</label>
        <DashboardInput
          name={"price"}
          placeholder={"35"}
          type="number"
          valueini={""}
        />
        <label className="text-lg">Size</label>
        {variants.map((variant) => (
          <div key={variant.name} className="w-full flex flex-row">
            <div className="w-1/2">
              <DashboardInput
                name={`variant-${variant.name}`}
                placeholder={variant.name}
                type="text"
                valueini={variant.name}
              />
            </div>
            <div className="w-1/2">
              <DashboardInput
                name={`stock-${variant.name}`}
                placeholder={variant.stock.toString()}
                type="number"
                valueini={variant.stock.toString()}
              />
            </div>
          </div>
        ))}
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

export default AddProductPage;
