"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

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
  const [error, setError] = useState<string>("");
  //   const validateInput = debounce((inputValue: string) => {
  //     let isValid = true;
  //     if (type === "email") {
  //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       isValid = emailRegex.test(inputValue);
  //     } else if (type === "number") {
  //       const number = parseInt(inputValue, 10);
  //       isValid = !isNaN(number) && number >= 1 && number <= 100;
  //     }
  //     if (!isValid) {
  //       setError("Invalid input, please check your data."); // Set an error message
  //     } else {
  //       setError(""); // Clear error message when input is valid
  //     }
  //   }, 500); // Delay of 500ms

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    // validateInput(value);
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
    // validateInput(value);
  };

  return (
    <div className="w-full relative">
      {type === "textarea" ? (
        <div>
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            className="w-full p-5 border-2 border-[#2e374a] rounded-sm bg-[var(--primary-dark-color)]"
            onChange={handleChange2}
            required
          />
        </div>
      ) : (
        <div>
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
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default DashboardInput;
