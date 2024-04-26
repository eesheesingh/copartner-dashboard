
import { Link } from "react-router-dom";
import PageHeader from "../Header/Header";
import "./RAPage.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const RAPage = () => {
  
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="R.A"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

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
                    <th style={{textAlign: "left", paddingLeft: "2rem"}}>R.P Name</th>
                    <th>Users</th>
                    <th>Spend on R.A</th>
                    <th className="filter-header">Earning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{textAlign: "left", paddingLeft: "2rem"}}><Link to="/ra-name">Anuj Kumar</Link></td>
                    <td className="text-blue-600"><Link to="/ra-name">100</Link></td>
                    <td className="text-red-500">200</td>
                    <td className="text-green-600">500</td>
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

export default RAPage;
