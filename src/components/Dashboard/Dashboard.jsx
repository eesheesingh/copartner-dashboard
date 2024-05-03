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
  const data = [
    {
      apName: "Varun Kumar",
      usersCome: 150,
      usersPay: 100,
      spendOnAP: 600,
      spendOnRA: 200,
      earning: 200,
    },
    {
      apName: "Parvez Alam",
      usersCome: 150,
      usersPay: 100,
      spendOnAP: 600,
      spendOnRA: 200,
      earning: 200,
    },
    // Add more data objects as needed
  ];

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
        title="A.P"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="table-list-mb">
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
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/${row.apName}`}>{row.apName}</Link>
                      </td>
                      <td>{row.usersCome}</td>
                      <td className="text-blue-400">
                        <Link to={`/${row.apName}`}>{row.usersPay}</Link>
                      </td>
                      <td className="text-red-500">{row.spendOnAP}</td>
                      <td className="text-red-500">{row.spendOnRA}</td>
                      <td className="text-green-600">{row.earning}</td>
                    </tr>
                  ))}
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
