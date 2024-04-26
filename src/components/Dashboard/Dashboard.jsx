// Dashboard.jsx
import { useState } from "react";
import "./Dashboard.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PageHeader from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
        title="Explore"
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
                    <th>AP Name</th>
                    <th>Users Come</th>
                    <th>Users Pay</th>
                    <th>Spend on A.P</th>
                    <th>Spend on R.A</th>
                    <th>Earning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Link to="a.p">Varun Kumar</Link></td>
                    <td>150</td>
                    <td className="text-blue-400"><Link to="a.p">100</Link></td>
                    <td className="text-red-500">600</td>
                    <td className="text-red-500">200</td>
                    <td className="text-green-600">200</td>
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

export default Dashboard;
