import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import PageHeader from "../Header/Header";
import Listing from "./Listing";
import WithRA from "./WithRA";
import WithAP from "./WithAP";

const RelationManagement = () => {
  const [activeButton, setActiveButton] = useState("Listing");
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Relation Management"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="px-4 flex md:gap-8 gap-2">
        <button
          onClick={() => handleButtonClick("Listing")}
          className={`md:px-16 px-2 md:py-4 py-2 border-2 rounded-xl ${
            activeButton === "Listing" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          Listing
        </button>
        <button
          onClick={() => handleButtonClick("With R.A")}
          className={`md:px-16 px-2 md:py-4 py-2 border-2 rounded-xl ${
            activeButton === "With R.A" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          With R.A
        </button>
        <button
          onClick={() => handleButtonClick("With A.P")}
          className={`md:px-16 px-2 md:py-4 py-2 border-2 rounded-xl ${
            activeButton === "With A.P" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          With A.P
        </button>
      </div>

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="table-list-mb">
            {activeButton === "Listing" && (
              <Listing
                data={[
                  { date: "01/04/2024", name: "Vinit", number: "9798723498" },
                ]}
                activeButton={activeButton}
              />
            )}
            {activeButton === "With R.A" && (
              <WithRA
                data={[
                  {
                    date: "01/04/2024",
                    raName: "Anuj Kumar",
                    relationManagement: "Vinit",
                  },
                  // Add more data objects as needed
                ]}
                activeButton={activeButton}
              />
            )}
            {activeButton === "With A.P" && (
              <WithAP
                data={[
                  {
                    date: "01/04/2024",
                    apName: "Anuj Kumar",
                    relationManagement: "Vinit",
                  },
                ]}
                activeButton={activeButton}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RelationManagement;
