import React, { useState, useEffect } from "react";
import PageHeader from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import MarketingContentPopup from "./MarketingContentPopup";
import BannerMarketing from "./BannerMarketing";
import MarketingVideo from "./MarketingVideo";
import "react-toastify/dist/ReactToastify.css";

const MarketingContent = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("Banners");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bannersData, setBannersData] = useState([]);
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://copartners.in:5134/api/MarketingContent");
        const data = await response.json();
        setBannersData(data.filter(item => item.contentType === "banner"));
        setVideosData(data.filter(item => item.contentType === "video"));
      } catch (error) {
        toast.error("Failed to fetch marketing content");
      }
    };
    fetchData();
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleSaveData = async (newData) => {
    try {
      const formData = new FormData();
      formData.append(activeButton === "Banners" ? "image" : "video", newData.file);
      formData.append("name", newData.name);
      formData.append("contentType", activeButton.toLowerCase());

      const response = await fetch("https://copartners.in:5134/api/MarketingContent", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const savedData = await response.json();
      if (activeButton === "Banners") {
        setBannersData([...bannersData, savedData]);
      } else {
        setVideosData([...videosData, savedData]);
      }

      toast.success(`${activeButton} added successfully`);
    } catch (error) {
      toast.error("Failed to save data");
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
                className="border-2 border-black rounded-lg px-4 py-1 mr-4"
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
