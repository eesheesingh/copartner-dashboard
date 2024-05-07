// MarketingContent.js

import React, { useState } from "react";
import PageHeader from "../Header/Header";
import { ToastContainer } from "react-toastify";
import MarketingContentPopup from "./MarketingContentPopup";
import BannerMarketing from "./BannerMarketing";
import MarketingVideo from "./MarketingVideo";

const MarketingContent = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("Banners");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bannersData, setBannersData] = useState([
    { id: 1, name: "Banner 1", image: null },
    { id: 2, name: "Banner 2", image: null },
    { id: 3, name: "Banner 3", image: null },
  ]);
  const [videosData, setVideosData] = useState([
    { id: 1, name: "Video 1", video: null },
    { id: 2, name: "Video 2", video: null },
    { id: 3, name: "Video 3", video: null },
  ]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleSaveData = (newData) => {
    if (activeButton === "Banners") {
      setBannersData([
        ...bannersData,
        { ...newData, id: bannersData.length + 1 },
      ]);
    } else {
      setVideosData([...videosData, { ...newData, id: videosData.length + 1 }]);
    }
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Marketing Content"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="px-4 flex gap-8">
        <button
          onClick={() => handleButtonClick("Banners")}
          className={`px-16 py-4 border-2 rounded-xl ${
            activeButton === "Banners" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          Banner
        </button>
        <button
          onClick={() => handleButtonClick("Videos")}
          className={`px-16 py-4 border-2 rounded-xl ${
            activeButton === "Videos" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          Video
        </button>
      </div>

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="table-list-mb">
            <div className="channel-heading flex">
              <h3 className="text-xl font-semibold mr-auto">{activeButton}</h3>
              <button
                className=" border-2 border-black rounded-lg px-4 py-1 mr-4"
                onClick={() => setIsPopupOpen(true)}
              >
                + Add
              </button>
            </div>
            {activeButton === "Banners" ? (
              <div className="grid grid-cols-3 gap-4 p-4">
                {bannersData.map((banner) => (
                  <BannerMarketing key={banner.id} banner={banner} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 p-4">
                {videosData.map((video) => (
                  <MarketingVideo key={video.id} video={video} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <MarketingContentPopup
          onClose={handleClosePopup}
          contentType={activeButton}
          onSave={handleSaveData}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default MarketingContent;
