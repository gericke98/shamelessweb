import React from "react";
import { MdSearch } from "react-icons/md";

type Props = {
  placeholder: string;
};

const Search = ({ placeholder }: Props) => {
  return (
    <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-2">
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none text-white"
      />
    </div>
  );
};

export default Search;
