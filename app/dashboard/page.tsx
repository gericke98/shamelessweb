import React from "react";
import Card from "./card/card";
import Orders from "./orders/page";
import Chart from "./chart/chart";

const DashboardPage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <div className="w-full flex flex-col gap-5">
        <div className="flex gap-5 space-between">
          <Card />
          <Card />
          <Card />
        </div>
        <Orders />
        <Chart />
      </div>
    </div>
  );
};

export default DashboardPage;
