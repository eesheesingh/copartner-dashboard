import { Link } from "react-router-dom";
import PageHeader from "../Header/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import TransactionAP from "./TransactionAP";

const Transaction = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("button1");

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
        <button
          onClick={() => handleButtonClick("button1")}
          className={`px-16 py-4 border-2 rounded-xl ${
            activeButton === "button1" ? "border-black" : "border-gray-200"
          } font-semibold`}
        >
          R.A
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
        {activeButton === "button1" ? (
          <div className="dashboard-view-section mb-4">
            <div className="table-list-mb">
              <div className="channel-heading">
                <h3 className="text-xl font-semibold">Listing</h3>
              </div>
              <div className="py-4 px-8">
                <table className="table-list">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", paddingLeft: "2rem" }}>
                        Date
                      </th>
                      <th style={{ textAlign: "left" }}>R.A Name</th>
                      <th style={{ textAlign: "left" }}>SEBI No.</th>
                      <th>Amount</th>
                      <th>Request</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                        01/04/2024
                      </td>
                      <td
                        style={{ textAlign: "left" }}
                        className="text-blue-600"
                      >
                        <Link to="/agency">Arun Kumar</Link>
                      </td>
                      <td style={{ textAlign: "left" }}>89798798234</td>
                      <td>3000</td>
                      <td>
                        <label for="R.A request">Select</label>

                        <select name="R.A request" id="R.A request">
                          <option value="accept">Accept</option>
                          <option value="reject">Reject</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <TransactionAP />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Transaction;
