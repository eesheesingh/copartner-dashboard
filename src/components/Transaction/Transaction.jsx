import { Link } from "react-router-dom";
import PageHeader from "../Header/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const Transaction = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonBorderColor, setButtonBorderColor] = useState({
    button1: "transparent",
    button2: "transparent",
  });

  const handleButtonClick = (buttonId) => {
    setButtonBorderColor((prevState) => ({
      ...prevState,
      [buttonId]: "black",
    }));
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Explore"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="p-4 flex gap-8">
        <button
          onClick={() => handleButtonClick("button1")}
          className={`px-16 py-4 border-2 rounded-xl border-${buttonBorderColor.button1} border-gray-500 font-semibold`}
        >
          R.A
        </button>
        <button
          onClick={() => handleButtonClick("button2")}
          className={`px-16 py-4 border-2 rounded-xl border-${buttonBorderColor.button2} border-gray-500 font-semibold`}
        >
          A.P
        </button>
      </div>

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="my-8 table-list-mb">
            <div className="channel-heading">
              <h3 className="text-xl font-semibold">Listing</h3>
            </div>
            <div className="m-8">
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
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Transaction;
