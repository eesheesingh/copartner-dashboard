// Dashboard.jsx
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PageHeader from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import AdAgencyPopup from "./AdAgencyPopup";

const AgencyList = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // const handleError = (err) =>
  //   toast.info(err, {
  //     position: "bottom-left",
  //   });
  // const handleSuccess = (message) =>
  //   toast.success(message, {
  //     position: "bottom-left",
  //   });

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Ad Agency Details"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="my-8 table-list-mb">
            <div className="channel-heading flex">
            <h3 className="text-xl font-semibold mr-auto">Listing</h3>
              <button className=" border-2 border-black rounded-lg px-4 py-1 mr-4" onClick={() => setIsPopupOpen(true)}>+ Add</button>
            </div>
            <div className="m-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Agency Name</th>
                    <th>Landing Page Link</th>
                    <th>Users</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{fontWeight: "700"}}>01/04/2024</td>
                    <td style={{fontWeight: "700"}} className="text-blue-400"><Link to="/agency">Agency 1</Link></td>
                    <td>Lorem ipsum dolor...</td>
                    <td>3000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <AdAgencyPopup onClose = {handleClosePopup} />}
      <ToastContainer />
    </div>
  );
};

export default AgencyList;
