import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

type Props = {
  placeholder: string;
  onChange: (value: string) => void;
};

const Search = ({ placeholder, onChange }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    onChange(value); // Call the callback function with the new value
  };
  return (
    <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-2">
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none text-white"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
