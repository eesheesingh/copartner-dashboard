import React, { useState, useEffect } from "react";
import "./RAList.css";
import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RAList = () => {
  const { raId } = useParams();
  const navigate = useNavigate();
  const [selectedRA, setSelectedRA] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://copartners.in:5132/api/RADashboard/GetDashboardRAListingData/${raId}?page=1&pageSize=10`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSelectedRA(data.data);
      } catch (error) {
        toast.error("Error fetching RA data:", error);
      }
    };

    fetchData();
  }, [raId]);

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="R.A Details"
        searchQuery=""
        setSearchQuery={() => {}}
        hasNotification={false}
        setHasNotification={() => {}}
      />

      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button onClick={() => navigate(-1)}>
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {selectedRA.length === 0 ? (
        <div className="flex items-center justify-center mt-28 text-3xl font-bold p-6">
          R.A details not found
        </div>
      ) : (
        <div className="requestContainer mx-5 bg-[#fff]">
          <div className="requestHeading flex justify-between items-center text-2xl font-bold p-4">
            <h2 className="pl-3 text-xl font-semibold">{selectedRA[0].name}</h2>
          </div>

          <div className="requestTable px-5 pb-3">
            <table className="request-table">
              <thead>
                <tr className="requestColumns">
                  <th className="text-left">Date</th>
                  <th className="text-left">Users</th>
                  <th>Come by A.P</th>
                  <th>Amount Paid</th>
                  <th>Subscription</th>
                </tr>
              </thead>
              <tbody>
                {selectedRA.map((ra, index) => (
                  <tr key={index} className="request-numbers font-semibold">
                    <td className="p-3">{new Date(ra.date).toLocaleDateString()}</td>
                    <td className="p-3">{ra.userMobileNo}</td>
                    <td className="p-3 text-center">{ra.apName}</td>
                    <td className="p-3 text-yellow-400 text-center">
                      {ra.amount}
                    </td>
                    <td className="p-3 text-center">{ra.subscription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default RAList;
