import { getUsers } from "@/db/queries";
import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";

export default async function CardUsers() {
  const users = await getUsers();
  return (
    <div className="flex flex-row bg-[var(--primary-soft-color)] p-5 rounded-sm gap-5 pointer w-full hover:bg-[#2e374a]">
      <MdSupervisedUserCircle size={24} />
      <div className="flex flex-col gap-5">
        <span className="text-lg font-medium">Total Users</span>
        <span className="text-2xl font-medium">{users.length}</span>
      </div>
    </div>
  );
}
