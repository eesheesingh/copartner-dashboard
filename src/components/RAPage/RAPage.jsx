import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../Header/Header";
import "./RAPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RAPage = () => {
  const [rpData, setRpData] = useState([]);

  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRAData = async () => {
      try {
        const response = await fetch("https://copartners.in:5132/api/RADashboard/DashboardRAListing?page=1&pageSize=10");
        if (!response.ok) {
          throw new Error('Something went wrong, status ' + response.status);
        }
        const data = await response.json();
        setRpData(data.data);
      } catch (error) {
        toast.error(`Failed to fetch data: ${error.message}`);
      }
    };

    fetchRAData();
  }, []);

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
                    <tr key={index} className="even:bg-gray-100 odd:bg-white">
                      <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                        <Link to={`/r.a/${row.id}`}>{row.name}</Link>
                      </td>
                      <td className="text-blue-600">
                        <Link to={`/r.a/${row.id}`}>{row.usersCount}</Link>
                      </td>
                      <td className="text-red-500">{row.raEarning}</td>
                      <td className="text-green-600">{row.cpEarning}</td>
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
