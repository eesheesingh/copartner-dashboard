import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import PageHeader from "../Header/Header";
import SubAdmin from "./SubAdmin";
import RaAdmin from "./RaAdmin";
import ApAdmin from "./ApAdmin";
import LoginPopup from "./LoginPopup";

const Login = () => {
  const [activeButton, setActiveButton] = useState("Sub-Admin");
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const openSubAdmin = () => {
    setIsPopupOpen(true);
  };

  const closeLogin = () => {
    setIsPopupOpen(false);
  }

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Login Credentials"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="px-4 flex md:gap-8 gap-2">
        <button
          onClick={() => handleButtonClick("Sub-Admin")}
          className={`md:px-12 px-2 md:py-4 py-2 border-2 rounded-xl ${
            activeButton === "Sub-Admin" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          Sub-Admin
        </button>
        <button
          onClick={() => handleButtonClick("R.A")}
          className={`md:px-16 px-2 md:py-4 py-2 border-2 rounded-xl ${
            activeButton === "R.A" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          R.A
        </button>
        <button
          onClick={() => handleButtonClick("A.P")}
          className={`md:px-16 px-2 md:py-4 py-2 border-2 rounded-xl ${
            activeButton === "A.P" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          A.P
        </button>
      </div>

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="table-list-mb">
            {activeButton === "Sub-Admin" && (
              <SubAdmin
              openSubAdmin={openSubAdmin}  
              data={[
                  { name: "Vinit", email: "vinit@gmail.com" },
                ]}
                activeButton={activeButton}
              />
            )}
            {activeButton === "R.A" && (
              <RaAdmin
              openSubAdmin={openSubAdmin}  
              data={[
                  {
                    name: "Anuj Kumar",
                    email: "Anuj@gmail.com",
                  },
                  // Add more data objects as needed
                ]}
                activeButton={activeButton}
              />
            )}
            {activeButton === "A.P" && (
              <ApAdmin
              openSubAdmin={openSubAdmin}  
              data={[
                  {
                    name: "Anuj Kumar",
                    email: "Anuj@gmail.com",
                  },
                ]}
                activeButton={activeButton}
              />
            )}
          </div>
        </div>
      </div>
      {isPopupOpen && <LoginPopup title={activeButton} closeLogin={closeLogin}  />}
      <ToastContainer />
    </div>
  );
};

export default Login;
