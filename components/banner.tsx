import { cn } from "@/lib/utils";

type Props = {
  text: string;
  variant: "dark" | "white";
  repeat: number;
};

export const Banner = ({ text, variant, repeat }: Props) => {
  const repeatCount = repeat;
  const repeatedTexts = Array(repeatCount)
    .fill(null)
    .map((_, index) => (
      <p key={index} className="text-lg uppercase m-0 p-0 font-weight-500">
        {text}
      </p>
    ));

  return (
    <div
      className={cn(
        "flex overflow-hidden select-none p-0 m-0 h-[50px] bg-black",
        variant === "dark" ? "bg-black" : "bg-white"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 flex justify-around items-center min-w-full gap-4 animate-infinite-scroll border-transparent border-none",
          variant === "dark" ? "bg-black text-white" : "bg-white text-black"
        )}
      >
        {repeatedTexts}
      </div>
      <div
        className={cn(
          "flex-shrink-0 flex justify-around items-center min-w-full gap-4 animate-infinite-scroll border-transparent aria-hidden:true border-nones",
          variant === "dark" ? "bg-black text-white" : "bg-white text-black"
        )}
      >
        {repeatedTexts}
      </div>
    </div>
  );
};

export default Banner;
