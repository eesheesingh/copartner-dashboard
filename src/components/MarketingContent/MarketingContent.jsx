import { Link } from "react-router-dom";
import PageHeader from "../Header/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import MarketingContentPopup from "./MarketingContentPopup";

const MarketingContent = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("button1");
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
        title="Transaction"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="p-4 flex gap-8">
        <Link
          to="/marketingcontent/banner"
          onClick={() => handleButtonClick("button1")}
          className={`px-16 py-4 border-2 rounded-xl ${
            activeButton === "button1" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          Banner
        </Link>
        <Link
          to="/marketingcontent/video"
          onClick={() => handleButtonClick("button2")}
          className={`px-16 py-4 border-2 rounded-xl ${
            activeButton === "button2" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          Video
        </Link>
      </div>

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="my-8 table-list-mb">
            <div className="channel-heading flex">
              <h3 className="text-xl font-semibold mr-auto">Banners</h3>
              <button className=" border-2 border-black rounded-lg px-4 py-1 mr-4" onClick={() => setIsPopupOpen(true)}>+ Add</button>
            </div>
            {/* <div className="m-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", paddingLeft: "2rem" }}>
                      Date
                    </th>
                    <th style={{textAlign: "left"}}>R.A Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                      01/04/2024
                    </td>
                    <td style={{textAlign: "left"}} className="text-blue-600">
                      <Link to="/agency">Arun Kumar</Link>
                    </td>
                    <td>3000</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
      </div>
      {isPopupOpen && <MarketingContentPopup onClose = {handleClosePopup} />}
      <ToastContainer />
    </div>
  );
};

export default MarketingContent;
