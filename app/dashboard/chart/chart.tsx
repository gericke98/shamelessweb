"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "01/01/2024",
    visits: 4000,
    orders: 3000,
  },
  {
    name: "02/01/2024",
    visits: 3000,
    orders: 7000,
  },
  {
    name: "03/01/2024",
    visits: 5000,
    orders: 5000,
  },
  {
    name: "04/01/2024",
    visits: 7000,
    orders: 4000,
  },
  {
    name: "05/01/2024",
    visits: 2000,
    orders: 3000,
  },
  {
    name: "06/01/2024",
    visits: 1000,
    orders: 2000,
  },
  {
    name: "07/01/2024",
    visits: 4000,
    orders: 3000,
  },
];

export default function Chart() {
  return (
    <div className="w-full h-[450px] bg-[var(--primary-soft-color)] lg:p-5 p-2">
      <h2 className="font-regular text-white mb-5">Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
