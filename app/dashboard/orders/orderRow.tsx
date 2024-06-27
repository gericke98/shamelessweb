import { cn } from "@/lib/utils";
import { OrderType } from "@/types";
import Link from "next/link";

type Props = {
  order: OrderType;
};

export const OrderRow = ({ order }: Props) => {
  return (
    <tr>
      <td className="p-2 cursor-pointer text-xs lg:text-base">
        <Link href={`/dashboard/orders/${order.id}`}>#33{order.id}</Link>
      </td>
      <td className="p-2 text-xs lg:text-base">
        {order.createdAt
          ? order.createdAt.toLocaleString()
          : new Date().toLocaleString()}
      </td>
      <td className="p-2 text-xs lg:text-base">
        {order.client.name} {order.client.surname}
      </td>
      <td className="p-2 text-xs lg:text-base">
        € {(order.total / 100).toFixed(2)}
      </td>
      <td className="p-2 text-xs lg:text-base">
        <span
          className={cn(
            "rounded-sm lg:px-1 px-0.5 lg:text-sm text-xs white",
            order.paid === false ? "bg-[#f7737375]" : "bg-[#afd6ee75]"
          )}
        >
          {order.paid === false ? "Not paid" : "Paid"}
        </span>
      </td>
      <td className="p-2">
        <span
          className={cn(
            "rounded-sm lg:px-1 px-0.5 lg:text-sm text-xs white",
            order.fulfilled === false ? "bg-[#f7737375]" : "bg-[#afd6ee75]"
          )}
        >
          {order.fulfilled === false ? "Not fulfilled" : "Fulfilled"}
        </span>
      </td>
      <td className="p-2 text-xs lg:text-base">{order.products.length}</td>
    </tr>
  );
};
