import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Registration from "./Registration";
import FirstTimePayment from "./FirstTimePayment";
import PageHeader from "../Header/Header";
import SecondTimePayment from "./SecondTimePayment";

const UserData = () => {
  const [activeButton, setActiveButton] = useState("Registration");
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="User Data"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="px-4 flex md:gap-8 gap-2">
        <button
          onClick={() => handleButtonClick("Registration")}
          className={`md:px-8 px-2 md:py-2 py-2 md:max-w-44 border-2 rounded-xl ${
            activeButton === "Registration" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          Registration
        </button>
        <button
          onClick={() => handleButtonClick("First Time Payment")}
          className={`md:px-8 px-2 md:py-2 py-2 md:max-w-44 border-2 rounded-xl ${
            activeButton === "First Time Payment"
              ? "border-black"
              : "border-gray-200"
          } font-semibold`}
        >
          First Time Payment
        </button>
        <button
          onClick={() => handleButtonClick("Second Time Payment")}
          className={`md:px-8 px-2 md:py-2 py-2 md:max-w-44 border-2 rounded-xl ${
            activeButton === "Second Time Payment"
              ? "border-black"
              : "border-gray-200"
          } font-semibold`}
        >
          Second Time Payment
        </button>
      </div>

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="table-list-mb">
            <div className="channel-heading flex">
              <h3 className="text-xl font-semibold mr-auto">{activeButton}</h3>
              <button className=" border-2 border-black rounded-lg px-4 py-1 mr-4">
                Download Sheet
              </button>
            </div>
            {activeButton === "Registration" && <Registration searchQuery={searchQuery}/> }
            {activeButton === "First Time Payment" && <FirstTimePayment searchQuery={searchQuery}/> }
            {activeButton === "Second Time Payment" && <SecondTimePayment searchQuery={searchQuery}/> }
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserData;
