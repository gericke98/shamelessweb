import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";

export default function Card() {
  return (
    <div className="flex flex-row bg-[var(--primary-soft-color)] p-5 rounded-sm gap-5 pointer w-full hover:bg-[#2e374a]">
      <MdSupervisedUserCircle size={24} />
      <div className="flex flex-col gap-5">
        <span className="text-lg font-medium">Total Users</span>
        <span className="text-2xl font-medium">10.374</span>
        <span className="text-sm">
          <span>
            <span className={1 > 0 ? "text-green-400" : "text-red-600"}>
              12%
            </span>{" "}
            more than previous week
          </span>
        </span>
      </div>
    </div>
  );
}
