import React from "react";
import Card from "./card/card";
import RightBar from "./rightbar/rightbar";
import Orders from "./orders/orders";
import Chart from "./chart/chart";

const DashboardPage = () => {
  return (
    <div className="flex gap-5 mt-5">
      <div className="basis-3/4 flex flex-col gap-5">
        <div className="flex gap-5 space-between">
          <Card />
          <Card />
          <Card />
        </div>
        <Orders />
        <Chart />
      </div>
      <div className="basis-1/4">
        <RightBar />
      </div>
    </div>
  );
};

export default DashboardPage;
