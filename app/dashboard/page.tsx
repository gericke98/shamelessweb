import React from "react";
import Card from "./card/cardProducts";
import Orders from "./orders/page";
import Chart from "./chart/chart";
import CardUsers from "./card/cardUsers";
import CardOrders from "./card/cardOrders";
import CardProducts from "./card/cardProducts";

const DashboardPage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <div className="w-full flex flex-col gap-5">
        <div className="flex gap-5 space-between">
          <CardUsers />
          <CardOrders />
          <CardProducts />
        </div>
        <Orders />
        <Chart />
      </div>
    </div>
  );
};

export default DashboardPage;
