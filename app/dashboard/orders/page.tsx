import { getOrders } from "@/db/queries";
import React from "react";
import { OrderRow } from "./orderRow";
import { revalidatePath } from "next/cache";

const Orders = async () => {
  //Get all the orders
  revalidatePath("/");
  const orders = await getOrders();
  return (
    <div className="bg-[var(--primary-soft-color)] lg:p-5 p-3 rounded-sm min-h-96">
      <h2 className="mb-5 font-light">Latest transactions</h2>
      <table className="w-full">
        <thead className="text-left">
          <th className="p-2 text-xs lg:text-lg">Id</th>
          <th className="p-2 text-xs lg:text-lg">Date</th>
          <th className="p-2 text-xs lg:text-lg">Name</th>
          <th className="p-2 text-xs lg:text-lg min-w-20 ">Total</th>
          <th className="p-2 text-xs lg:text-lg">Payment status</th>
          <th className="p-2 text-xs lg:text-lg">Fulfillment status</th>
          <th className="p-2 text-xs lg:text-lg">Items</th>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
