import { ChangeEvent, KeyboardEvent, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Perform the search or any action when Enter is pressed
      console.log("Search initiated for:", searchTerm);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="text-sm 2xl:text-md  flex items-center  gap-1 2xl:gap-3 w-[90vw] lg:w-[400px] 2xl:w-[500px] h-[2.5rem] md:h-[3.3rem]  py-3 px-3 bg-gray-200 rounded text-gray-950"
    >
      <HiOutlineMagnifyingGlass className="text-xl 2xl:text-2xl" />
      <input
        className="outline-none border-none bg-inherit w-full h-full text-inherit text-black"
        type="text"
        placeholder="Search for cars (e.g., BMW, Audi, Ford)"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      {searchTerm && (
        <button className="bg-white rounded-full p-1" onClick={handleReset}>
          <RxCross2 />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
