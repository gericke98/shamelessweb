import { cn } from "@/lib/utils";
import { UserType } from "@/types";
import Link from "next/link";

type Props = {
  user: UserType;
};

export const UserRow = ({ user }: Props) => {
  return (
    <tr>
      <td className="p-2">
        {user.name} {user.surname}
      </td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.city}</td>
      <td
        className={cn(
          "p-2",
          user.subscribed ? "bg-[#afd6ee75]" : "bg-[#f7737375]"
        )}
      >
        {user.subscribed ? "Yes" : "No"}
      </td>
      <td className="p-2">
        <div className="flex gap-2">
          <Link href="/add">
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
  );
};
