import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/dashboard/search/search";
import Link from "next/link";
import React from "react";

const UsersPage = async () => {
  // const users = await fetchUsers();
  // console.log(users);
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm m-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a user" />
        <Link href="/dashboard/users/add">
          <button className="p-2 bg-[#5d57c9] text-white border-none rounded-sm cursor-pointer text-sm">
            Add New
          </button>
        </Link>
      </div>
      <table className="w-full text-left">
        <thead>
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Created at</th>
          <th className="p-2">Role</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">John Pollon</td>
            <td className="p-2">sgerickee@gmail.com</td>
            <td className="p-2">13.01.2022</td>
            <td className="p-2">Admin</td>
            <td className="p-2">Active</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
                    View
                  </button>
                </Link>
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]">
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2">John Pollon</td>
            <td className="p-2">sgerickee@gmail.com</td>
            <td className="p-2">13.01.2022</td>
            <td className="p-2">Admin</td>
            <td className="p-2">Active</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
                    View
                  </button>
                </Link>
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]">
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2">John Pollon</td>
            <td className="p-2">sgerickee@gmail.com</td>
            <td className="p-2">13.01.2022</td>
            <td className="p-2">Admin</td>
            <td className="p-2">Active</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
                    View
                  </button>
                </Link>
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]">
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2">John Pollon</td>
            <td className="p-2">sgerickee@gmail.com</td>
            <td className="p-2">13.01.2022</td>
            <td className="p-2">Admin</td>
            <td className="p-2">Active</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
                    View
                  </button>
                </Link>
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]">
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
