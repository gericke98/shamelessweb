"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const FloatingLabelInput = ({
  name,
  placeholder,
  type,
}: {
  name: string;
  placeholder: string;
  type: string;
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full relative">
      <input
        type={type}
        name={name}
        className={cn(
          "pt-5 bg-transparent border-2 border-[#d6d7d9] rounded-xl w-full pl-5 pr-5",
          value ? "pb-1" : "pb-5"
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <label
        htmlFor="name"
        className={
          value
            ? "absolute top-2.5 left-4 text-gray-500 transition-all duration-300 ease-in-out -translate-y-1 text-sm"
            : "hidden"
        }
      >
        {placeholder}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
