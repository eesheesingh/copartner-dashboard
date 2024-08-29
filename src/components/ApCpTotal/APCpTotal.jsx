import React, { useState, useEffect } from "react";
import PageHeader from "../Header/Header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApCpTotal = () => {
  const [totals, setTotals] = useState({
    totalAPEarning: 0,
    totalRAEarning: 0,
    totalCPEarning: 0,
  });

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const [apResponse, raResponse] = await Promise.all([
          fetch(
            "https://copartners.in:5133/api/APDashboard/DashboardAPListing?page=1&pageSize=100000"
          ),
          fetch(
            "https://copartners.in:5132/api/RADashboard/DashboardRAListing?page=1&pageSize=100000"
          ),
        ]);

        if (!apResponse.ok || !raResponse.ok) {
          throw new Error(
            `Something went wrong, AP status: ${apResponse.status}, RA status: ${raResponse.status}`
          );
        }

        const apData = await apResponse.json();
        const raData = await raResponse.json();

        const totalAPEarning = apData.data.reduce(
          (sum, item) => sum + (item.cpEarning || 0),
          0
        );

        const totalRAEarning = raData.data.reduce(
          (sum, item) => sum + (item.cpEarning || 0),
          0
        );

        const totalCPEarning = totalAPEarning + totalRAEarning;

        setTotals({
          totalAPEarning,
          totalRAEarning,
          totalCPEarning,
        });
      } catch (error) {
        toast.error(`Failed to fetch earnings: ${error.message}`);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Earnings"
        searchQuery=""
        setSearchQuery={() => {}}
        hasNotification={false}
        setHasNotification={() => {}}
      />

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="table-list-mb">
            <div className="py-4 px-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>RA Earnings</th>
                    <th>AP Earnings</th>
                    <th>CP Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="text-blue-600 font-bold">
                      {totals.totalRAEarning.toFixed(2)}
                    </td>
                    <td className="text-blue-600 font-bold">
                      {totals.totalAPEarning.toFixed(2)}
                    </td>
                    <td className="text-green-600 font-bold">
                      {totals.totalCPEarning.toFixed(2)}
                    </td>
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

export default ApCpTotal;
