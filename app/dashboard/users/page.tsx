import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/dashboard/search/search";
import { getUsers } from "@/db/queries";
import Link from "next/link";
import React from "react";
import { UserRow } from "./userRow";

const UsersPage = async () => {
  const users = await getUsers();
  return (
    <div className="bg-[var(--primary-soft-color)] lg:p-5 rounded-sm m-5 min-h-screen">
      <div className="flex items-center justify-between">
        {/* <Search placeholder="Search for a user" /> */}
        <Link href="/dashboard/users/add">
          <button className="p-2 bg-[#5d57c9] text-white border-none rounded-sm cursor-pointer lg:text-sm text-xs mb-5">
            Add New
          </button>
        </Link>
      </div>
      <table className="w-full text-left">
        <thead>
          <th className="p-2 text-xs lg:text-lg">Name</th>
          <th className="p-2 text-xs lg:text-lg">Email</th>
          <th className="p-2 text-xs lg:text-lg">City</th>
          <th className="p-2 text-xs lg:text-lg">Subscribed</th>
          <th className="p-2 text-xs lg:text-lg">Actions</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
