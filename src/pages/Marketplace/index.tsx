import React from "react";
import NFTCard from "../../components/common/NFTCard";

const Marketplace = () => {
    return (
        <div className="w-full mt-20">
            {/* Title bar */}
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl text-white text-center font-semibold">Marketplace</h1>
                <p className="text-base font-normal text-white/50 mt-2 text-center">Lorem ipsum dolor sit amet consectetur</p>
            </div>
            <div className="grid grid-cols-2 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 gap-5 w-full">
                <NFTCard />
                <NFTCard />
                <NFTCard />
                <NFTCard />
                <NFTCard />
                <NFTCard />
                <NFTCard />
                <NFTCard />
                <NFTCard />
                <NFTCard />
            </div>
        </div>
    );
}

export default Marketplace;