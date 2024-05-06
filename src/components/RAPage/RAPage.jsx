import { Link } from "react-router-dom";
import PageHeader from "../Header/Header";
import "./RAPage.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const RAPage = () => {
  const rpData = [
    {
      name: "Anuj Kumar",
      users: 100,
      spendOnRA: 200,
      earning: 500,
    },
    {
      name: "Kapil Sharma",
      users: 200,
      spendOnRA: 300,
      earning: 700,
    },
    {
      name: "Kishan Kapoor",
      users: 250,
      spendOnRA: 500,
      earning: 950,
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
            <div className="py-4 px-8">
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
                        <Link to={`/r.a/${row.name}`}>{row.name}</Link>
                      </td>
                      <td className="text-blue-600">
                        <Link to={`/r.a/${row.name}`}>{row.users}</Link>
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
