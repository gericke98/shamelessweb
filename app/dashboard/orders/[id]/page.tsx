import { editOrder } from "@/actions/oders";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import { getOrder } from "@/db/queries";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const SingleOrderPage = async ({ params }: Props) => {
  const order = await getOrder(params.id);

  return (
    <div className="flex gap-20 mt-5">
      <div className="w-full bg-[var(--primary-soft-color)] p-5 rounded-sm font-bold text-white">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold w-full text-left text-3xl mb-8">
            #33{order[0].id}
          </h1>
          {/* TO DO: AÑADIR X PARA SALIR DEL ORDER IR  */}
        </div>
        <form className="flex flex-col gap-2" action={editOrder}>
          <input className="hidden" name={"id"} value={order[0].clientId} />
          <label className="text-lg">Name</label>
          <DashboardInput
            name={"name"}
            placeholder={order[0].client.name}
            type="text"
            valueini={order[0].client.name}
          />
          <label className="text-lg">Email</label>
          <DashboardInput
            name={"email"}
            placeholder={order[0].client.email}
            type="text"
            valueini={order[0].client.email}
          />
          <label className="text-lg">Phone</label>
          <DashboardInput
            name={"phone"}
            placeholder={order[0].client.number.toString()}
            type="text"
            valueini={order[0].client.number.toString()}
          />
          <label className="text-lg mt-10">
            Dirección de envío y facturación
          </label>
          <label className="text-lg">Address</label>
          <DashboardInput
            name={"address"}
            placeholder={order[0].client.address1}
            type="text"
            valueini={order[0].client.address1}
          />
          <label className="text-lg">Address 2</label>
          <DashboardInput
            name={"address2"}
            placeholder={order[0].client.address2 || ""}
            type="text"
            valueini={order[0].client.address2 || ""}
          />
          <label className="text-lg">City</label>
          <DashboardInput
            name={"city"}
            placeholder={order[0].client.city}
            type="text"
            valueini={order[0].client.city}
          />
          <label className="text-lg">Zip Code</label>
          <DashboardInput
            name={"zip"}
            placeholder={order[0].client.zipcode}
            type="text"
            valueini={order[0].client.zipcode}
          />
          {/* <label className="text-lg">Products</label> */}
          {/* {order[0].products.map((product) => (
            <div key={product.id} className="w-full flex flex-row">
              <div className="w-1/2">
                <DashboardInput
                  name={`variant-${product.id}`}
                  placeholder={product.id.toString()}
                  type="text"
                  valueini={product.id.toString()}
                />
              </div>
              <div className="w-1/2">
                <DashboardInput
                  name={`stock-${product.id}`}
                  placeholder={product.quantity.toString()}
                  type="number"
                  valueini={product.quantity.toString()}
                />
              </div>
            </div>
          ))} */}
          <button className="w-full p-5 bg-[teal] border-none text-white rounded-sm cursor-pointer mt-4">
            Update
          </button>
        </form>
        {/* TO DO: ADD PRODUCTS ALREADY BOUGHT */}
      </div>
    </div>
  );
};

export default SingleOrderPage;
