import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Orders() {
  const x = "pending";
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm">
      <h2 className="mb-5 font-thin">Latest transactions</h2>
      <table className="w-full">
        <thead className="text-left">
          <th className="p-2">Name</th>
          <th className="p-2">Status</th>
          <th className="p-2">Date</th>
          <th className="p-2">Amount</th>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">John Doe</td>
            <td className="p-2">
              <span
                className={cn(
                  "rounded-sm p-1 text-sm white",
                  x === "pending"
                    ? "bg-[#f7cb7375]"
                    : x === "done"
                    ? "bg-[#afd6ee75]"
                    : "bg-[#f7737375]"
                )}
              >
                Pending
              </span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">€100</td>
          </tr>
          <tr>
            <td className="p-2">Tom Crack</td>
            <td className="p-2">
              <span className="pending">Cancelled</span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">€100</td>
          </tr>
          <tr>
            <td className="p-2">Tom Crack</td>
            <td className="p-2">
              <span className="pending">Cancelled</span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">€100</td>
          </tr>
          <tr>
            <td className="p-2">Tom Crack</td>
            <td className="p-2">
              <span className="pending">Cancelled</span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">€100</td>
          </tr>
          <tr>
            <td className="p-2">Tom Crack</td>
            <td className="p-2">
              <span className="pending">Cancelled</span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">€100</td>
          </tr>
          <tr>
            <td className="p-2">Tom Crack</td>
            <td className="p-2">
              <span className="pending">Cancelled</span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">€100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
