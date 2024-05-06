import React from "react";
import { FaPen } from "react-icons/fa";
import Banner from "../../assets/banner.png";
import Bin from "../../assets/TrashBinMinimalistic.png";

const MarketingVideo = ({ bannerName }) => {
  return (
    <div className="bg-gray-100 rounded shadow-md flex flex-col items-center px-4 py-2">
      <div className="text-center flex items-center justify-between w-full">
        <div className="font-bold">
          {bannerName}
        </div>
        <div className="flex space-x-2">
          <button aria-label="Edit" className="focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaPen className="text-blue-600 cursor-pointer" />
          </button>
          <button aria-label="Delete" className="focus:outline-none focus:ring-2 focus:ring-red-500">
            <img
              className="w-6 h-6 cursor-pointer"
              src={Bin}
              alt="Delete"
            />
          </button>
        </div>
      </div>
      <div className="w-full my-2">
        <img
          src={Banner}
          alt="bannerName"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default MarketingVideo;
