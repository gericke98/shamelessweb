"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const DashboardInput = ({
  name,
  placeholder,
  type,
  valueini,
}: {
  name: string;
  placeholder: string;
  type: string;
  valueini: string;
}) => {
  const [value, setValue] = useState<string>(valueini);

  useEffect(() => {
    setValue(valueini);
  }, [valueini]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <div className="w-full relative">
      <div>
        {type === "textarea" ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            className="w-full p-5 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)]"
            onChange={handleChange}
            required
          />
        ) : type === "number" ? (
          <input
            type={type}
            name={name}
            className={cn(
              "pt-5 pb-5 bg-transparent border-2 border-[#d6d7d9] rounded-xl w-full pl-5 pr-5"
            )}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
            min={0}
          />
        ) : (
          <input
            type={type}
            name={name}
            className={cn(
              "pt-5 pb-5 bg-transparent border-2 border-[#d6d7d9] rounded-xl w-full pl-5 pr-5"
            )}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
          />
        )}
      </div>
    </div>
  );
};

export default DashboardInput;
