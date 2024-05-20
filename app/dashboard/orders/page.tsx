import { getOrders } from "@/db/queries";
import React from "react";
import { OrderRow } from "./orderRow";

const Orders = async () => {
  //Get all the orders
  const orders = await getOrders();
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm h-full">
      <h2 className="mb-5 font-thin">Latest transactions</h2>
      <table className="w-full">
        <thead className="text-left">
          <th className="p-2">Name</th>
          <th className="p-2">Status</th>
          <th className="p-2">Date</th>
          <th className="p-2">Amount</th>
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
