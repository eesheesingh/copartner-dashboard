import PageHeader from "../Header/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import MarketingContentPopup from "./MarketingContentPopup";
import MarketingVideo from "./MarketingVideo";
import BannerMarketing from "./BannerMarketing";

const MarketingContent = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("Banners");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
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
                <BannerMarketing bannerName="My Banner" />
                <BannerMarketing bannerName="My Banner" />
                <BannerMarketing bannerName="My Banner" />
                <BannerMarketing bannerName="My Banner" />
                <BannerMarketing bannerName="My Banner" />
                <BannerMarketing bannerName="My Banner" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 p-4">
                <MarketingVideo bannerName="Video Name" />
                <MarketingVideo bannerName="Video Name" />
                <MarketingVideo bannerName="Video Name" />
                <MarketingVideo bannerName="Video Name" />
                <MarketingVideo bannerName="Video Name" />
              </div>
            )}
          </div>
        </div>
      </div>
      {isPopupOpen && <MarketingContentPopup onClose={handleClosePopup} />}
      <ToastContainer />
    </div>
  );
};

export default MarketingContent;
