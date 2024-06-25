import { editUser } from "@/actions/users";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import { getUser } from "@/db/queries";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const SingleUserPage = async ({ params }: Props) => {
  const user = await getUser(params.id);
  return (
    <div className="flex gap-20 mt-5">
      <div className="w-full bg-[var(--primary-soft-color)] p-5 rounded-sm font-bold text-white">
        <form className="flex flex-col gap-2" action={editUser}>
          <input className="hidden" name={"id"} value={user[0].id} />
          <label className="text-lg">Name</label>
          <DashboardInput
            name={"name"}
            placeholder={user[0].name}
            type="text"
            valueini={user[0].name}
          />
          <label className="text-lg">Email</label>
          <DashboardInput
            name={"email"}
            placeholder={user[0].email}
            type="text"
            valueini={user[0].email}
          />
          <label className="text-lg">Phone</label>
          <DashboardInput
            name={"phone"}
            placeholder={user[0].number.toString()}
            type="text"
            valueini={user[0].number.toString()}
          />
          <label className="text-lg mt-10">
            Dirección de envío y facturación
          </label>
          <label className="text-lg">Address</label>
          <DashboardInput
            name={"address"}
            placeholder={user[0].address1}
            type="text"
            valueini={user[0].address1}
          />
          <label className="text-lg">Address 2</label>
          <DashboardInput
            name={"address2"}
            placeholder={user[0].address2 || ""}
            type="text"
            valueini={user[0].address2 || ""}
          />
          <label className="text-lg">City</label>
          <DashboardInput
            name={"city"}
            placeholder={user[0].city}
            type="text"
            valueini={user[0].city}
          />
          <label className="text-lg">Zip Code</label>
          <DashboardInput
            name={"zip"}
            placeholder={user[0].zipcode}
            type="text"
            valueini={user[0].zipcode}
          />
          <button className="w-full p-5 bg-[teal] border-none text-white rounded-sm cursor-pointer mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
