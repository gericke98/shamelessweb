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
        className="lg:pt-3 pt-2 bg-transparent border-2 border-[#d6d7d9] rounded-xl w-full pl-5 pr-5 text-sm lg:pb-3 pb-2"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default FloatingLabelInput;
