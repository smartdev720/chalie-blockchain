import React from "react";
import "./style.css";

const Search = () => {
    return (
        <div className="search-wrapper relative h-[36px] bg-[#2C2C2C] 2xl:w-[200px] xl:w-[200px] lg:w-[200px] md:w-full sm:w-full">
            <div className="inset-[1px] search-wrapper absolute flex items-center justify-center bg-[#212121]">
                <div className="flex items-center w-[90%]">
                <img src="./assets/search.svg" alt="search" className="mr-1" />
                <input
                    className="bg-transparent outline-none border-none text-white px-2 w-[80%] text-base"
                    placeholder="Search"
                />
                </div>
            </div>
        </div>
    );
}

export default Search;