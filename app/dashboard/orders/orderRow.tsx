import { cn } from "@/lib/utils";
import { OrderType } from "@/types";
import Link from "next/link";

type Props = {
  order: OrderType;
};

export const OrderRow = ({ order }: Props) => {
  return (
    <tr>
      <td className="p-2 cursor-pointer">
        <Link href={`/dashboard/orders/${order.id}`}>#33{order.id}</Link>
      </td>
      <td className="p-2">
        {order.createdAt
          ? order.createdAt.toLocaleString()
          : new Date().toLocaleString()}
      </td>
      <td className="p-2">
        {order.client.name} {order.client.surname}
      </td>
      <td className="p-2">€{order.total / 100}</td>
      <td className="p-2">
        <span
          className={cn(
            "rounded-sm p-1 text-sm white",
            order.paid === false ? "bg-[#f7737375]" : "bg-[#afd6ee75]"
          )}
        >
          {order.paid === false ? "Not paid" : "Paid"}
        </span>
      </td>
      <td className="p-2">
        <span
          className={cn(
            "rounded-sm p-1 text-sm white",
            order.fulfilled === false ? "bg-[#f7737375]" : "bg-[#afd6ee75]"
          )}
        >
          {order.fulfilled === false ? "Not fulfilled" : "Fulfilled"}
        </span>
      </td>
      <td className="p-2">{order.products.length} items</td>
    </tr>
  );
};
