"use client";
import { deleteUser } from "@/actions/users";
import { cn } from "@/lib/utils";
import { UserType } from "@/types";
import Link from "next/link";

type Props = {
  user: UserType;
};

export const UserRow = ({ user }: Props) => {
  return (
    <tr>
      <td className="p-2 text-xs lg:text-lg">
        {user.name} {user.surname}
      </td>
      <td className="p-2 text-xs lg:text-lg">{user.email}</td>
      <td className="p-2 text-xs lg:text-lg">{user.city}</td>
      <td
        className={cn(
          "p-2 text-xs lg:text-lg",
          user.subscribed ? "bg-[#afd6ee75]" : "bg-[#f7737375]"
        )}
      >
        {user.subscribed ? "Yes" : "No"}
      </td>
      <td className="p-2 text-xs lg:text-lg">
        <div className="flex gap-2">
          <Link href="/dashboard">
            <button
              className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson] text-xs lg:text-lg"
              onClick={async () => {
                await deleteUser(user.id);
              }}
            >
              Delete
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};
