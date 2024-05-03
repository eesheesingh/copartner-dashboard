import { Link } from "react-router-dom";
import PageHeader from "../Header/Header";
import "./RAPage.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const RAPage = () => {
  const rpData = [
    {
      name: "Anuj Kumar",
      link: "/ra-name",
      users: 100,
      spendOnRA: 200,
      earning: 500,
    },
    // Add more data objects as needed
  ];

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
          <div className="table-list-mb">
            <div className="channel-heading">
              <h3 className="text-xl font-semibold">Listing</h3>
            </div>
            <div className="m-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", paddingLeft: "2rem" }}>
                      R.P Name
                    </th>
                    <th>Users</th>
                    <th>Spend on R.A</th>
                    <th className="filter-header">Earning</th>
                  </tr>
                </thead>
                <tbody>
                  {rpData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                        <Link to={row.link}>{row.name}</Link>
                      </td>
                      <td className="text-blue-600">
                        <Link to={row.link}>{row.users}</Link>
                      </td>
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

export default RAPage;
