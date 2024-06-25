import { addUser } from "@/actions/users";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import React from "react";

const AddUsersPage = () => {
  return (
    <div className="flex gap-20 mt-5">
      <div className="w-full bg-[var(--primary-soft-color)] p-5 rounded-sm font-bold text-white">
        <form className="flex flex-col gap-2" action={addUser}>
          <input className="hidden" name={"id"} value="" />
          <label className="text-lg">Name</label>
          <DashboardInput
            name={"name"}
            placeholder=""
            type="text"
            valueini=""
          />
          <label className="text-lg">Surname</label>
          <DashboardInput
            name={"surname"}
            placeholder=""
            type="text"
            valueini=""
          />
          <label className="text-lg">Email</label>
          <DashboardInput
            name={"email"}
            placeholder=""
            type="text"
            valueini=""
          />
          <label className="text-lg">Phone</label>
          <DashboardInput
            name={"phone"}
            placeholder=""
            type="text"
            valueini=""
          />
          <label className="text-lg mt-10">
            Dirección de envío y facturación
          </label>
          <label className="text-lg">Address</label>
          <DashboardInput
            name={"address"}
            placeholder=""
            type="text"
            valueini=""
          />
          <label className="text-lg">Address 2</label>
          <DashboardInput
            name={"address2"}
            placeholder=""
            type="text"
            valueini=""
          />
          <label className="text-lg">City</label>
          <DashboardInput
            name={"city"}
            placeholder=""
            type="text"
            valueini=""
          />
          <label className="text-lg">Zip Code</label>
          <DashboardInput name={"zip"} placeholder="" type="text" valueini="" />
          <button className="w-full p-5 bg-[teal] border-none text-white rounded-sm cursor-pointer mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUsersPage;
