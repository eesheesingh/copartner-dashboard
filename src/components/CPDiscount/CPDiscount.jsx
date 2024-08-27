import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import PageHeader from "../Header/Header";
import CPDiscountCP from "./CPDiscountCP";
import CPDiscountAP from "./CPDiscountAP";
import CPDiscountPopup from "./CPDiscountPopup";
import CPDiscountPopupAP from "./CPDiscountPopupAP";

const CPDiscount = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("button1");

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const openAddPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title={activeButton === "button1" ? "C.P Discount" : "A.P Discount"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />
      <div className="p-4 flex gap-8">
        <button
          onClick={() => handleButtonClick("button1")}
          className={`px-16 py-4 border-2 rounded-xl ${
            activeButton === "button1" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          CP
        </button>
        <button
          onClick={() => handleButtonClick("button2")}
          className={`px-16 py-4 border-2 rounded-xl ${
            activeButton === "button2" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          A.P
        </button>
      </div>

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="table-list-mb">
            <div className="channel-heading flex">
              <h3 className="text-xl font-semibold mr-auto">
                {activeButton === "button1" ? "C.P Discount" : "A.P Discount"}
              </h3>
              <button
                className="border-2 border-black rounded-lg px-4 py-1 mr-4"
                onClick={openAddPopup}
              >
                + Add
              </button>
            </div>
            {activeButton === "button1" && <CPDiscountCP />}
            {activeButton === "button2" && <CPDiscountAP />}
          </div>
        </div>
      </div>

      {isPopupOpen && activeButton === "button1" && (
        <CPDiscountPopup closeCPDiscount={closePopup} />
      )}
      {isPopupOpen && activeButton === "button2" && (
        <CPDiscountPopupAP closeCPDiscount={closePopup} />
      )}

      <ToastContainer />
    </div>
  );
};

export default CPDiscount;
