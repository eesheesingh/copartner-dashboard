import React, { useState, useEffect } from "react";
import "./APPage.css";
import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const APPage = () => {
  const { apName } = useParams();
  const navigate = useNavigate();
  const [apData, setApData] = useState(null);

  const getExpertType = (typeId) => {
    switch (parseInt(typeId)) {
      case 1:
        return "Commodity";
      case 2:
        return "Equity";
      case 3:
        return "Options";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    fetchAPData();
  }, [apName]);

  const fetchAPData = async () => {
    try {
      const response = await fetch(
        `https://copartners.in:5133/api/APDashboard/GetDashboardAPListingData/${apName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApData(data.data);
    } catch (error) {
      console.error("Fetching error:", error);
      toast.error(`Failed to fetch AP data: ${error.message}`);
    }
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      {/* Page Header */}
      <PageHeader
        title="A.P"
        searchQuery=""
        setSearchQuery={() => {}}
        hasNotification={false}
        setHasNotification={() => {}}
      />

      {/* Back Button */}
      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {/* Display AP details */}
      {apData ? (
        <div className="requestContainer mx-5 bg-[#fff]">
          <div className="requestHeading flex justify-between items-center text-2xl font-bold p-4">
            <h2 className="pl-3 text-xl font-semibold">{apData[0]?.apName}</h2>
            <div className="channelOptions flex place-content-between px-6">
              <div className="chatLinks flex">
                <h3 className="mr-2 channel-heads text-lg">Link:</h3>
                <p className="text-lg">{apData[0]?.referralLink || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Table Layout */}
          <div className="requestTable px-5 pb-3">
            <table className="request-table">
              <thead>
                <tr className="requestColumns">
                  <th className="text-left">Date</th>
                  <th className="text-left">User</th>
                  <th>Amount Pay</th>
                  <th>R.A</th>
                  <th>Subscription</th>
                </tr>
              </thead>
              <tbody>
                {apData.map((data, index) => (
                  <tr key={index} className="request-numbers font-semibold">
                    <td className="p-3">
                      {new Date(data.subscribeDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {/* <Link to={`/${apName}/${data.userMobileNo}`}> */}
                        {data.userMobileNo}
                      {/* </Link> */}
                    </td>
                    <td className="p-3 text-center">{data.amount}</td>
                    <td className="p-3 text-center">{data.raName}</td>
                    <td className="p-3 text-center">{getExpertType(data.subscription)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-28 text-3xl font-bold p-6">
          User not found!
        </div>
      )}
    </div>
  );
};

export default APPage;
