import { getOrders } from "@/db/queries";
import React from "react";
import { OrderRow } from "./orderRow";
import { revalidatePath } from "next/cache";

const Orders = async () => {
  //Get all the orders
  revalidatePath("/");
  const orders = await getOrders();
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm min-h-96">
      <h2 className="mb-5 font-thin">Latest transactions</h2>
      <table className="w-full">
        <thead className="text-left">
          <th className="p-2">Id</th>
          <th className="p-2">Date</th>
          <th className="p-2">Name</th>
          <th className="p-2">Total</th>
          <th className="p-2">Payment status</th>
          <th className="p-2">Fulfillment status</th>
          <th className="p-2">Items</th>
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
