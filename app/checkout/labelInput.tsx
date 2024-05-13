"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { debounce } from "./validation";

const FloatingLabelInput = ({
  name,
  placeholder,
  type,
}: {
  name: string;
  placeholder: string;
  type: string;
}) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const validateInput = debounce((inputValue: string) => {
    let isValid = true;
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(inputValue);
    } else if (type === "number") {
      const number = parseInt(inputValue, 10);
      isValid = !isNaN(number) && number >= 1 && number <= 100;
    }
    if (!isValid) {
      setError("Invalid input, please check your data."); // Set an error message
    } else {
      setError(""); // Clear error message when input is valid
    }
  }, 500); // Delay of 500ms

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    validateInput(value);
  };

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
        onChange={handleChange}
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
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default FloatingLabelInput;
