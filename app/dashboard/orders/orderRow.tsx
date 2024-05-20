import { cn } from "@/lib/utils";
import { OrderType } from "@/types";

type Props = {
  order: OrderType;
};

export const OrderRow = ({ order }: Props) => {
  return (
    <tr>
      <td className="p-2">
        {order.client.name} {order.client.surname}
      </td>
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
        {order.createdAt
          ? order.createdAt.toLocaleString()
          : new Date().toLocaleString()}
      </td>
      <td className="p-2">€{order.total / 100}</td>
    </tr>
  );
};
