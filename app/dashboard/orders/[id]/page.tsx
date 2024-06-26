import { editOrder } from "@/actions/oders";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import { getOrder, getProducts } from "@/db/queries";
import Image from "next/image";
import React from "react";
import CloseIcon from "@/public/closewhite.svg";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const SingleOrderPage = async ({ params }: Props) => {
  const order = await getOrder(params.id);
  const products = await getProducts();
  // Extraigo los ids de los productos del pedido
  const orderProductsIds = order.flatMap((o) =>
    o.products.map((p) => p.productId)
  );

  const productOrders = products.filter((p) =>
    p.variants.some((v) => orderProductsIds.includes(v.id))
  );
  return (
    <div className="flex gap-20 mt-5">
      <div className="w-full bg-[var(--primary-soft-color)] p-5 rounded-sm font-bold text-white">
        <div className="flex flex-row justify-between items-start">
          <h1 className="font-bold h-full text-3xl mb-8">#33{order[0].id}</h1>
          <Link href="/dashboard/orders">
            <Image src={CloseIcon} width={30} height={30} alt="Close icon" />
          </Link>
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
          <label className="text-lg mt-10">Products</label>
          <div className="flex flex-row justify-between px-2 py-4">
            {productOrders.map((productOrder) => (
              <div
                key={productOrder.id}
                className="flex flex-col justify-center relative w-40 h-60"
              >
                <h5 className="bg-[var(--primary-dark-color)] px-3 py-1 rounded-full absolute top-0 right-0 z-50 text-center">
                  5
                </h5>
                <Image
                  src={productOrder.mainImg}
                  alt={productOrder.id.toString()}
                  fill
                />

                <h4 className="text-sm pt-5 w-40">{productOrder.name}</h4>
              </div>
            ))}
          </div>
          <button className="w-full p-5 bg-[teal] border-none text-white rounded-sm cursor-pointer mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleOrderPage;
