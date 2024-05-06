import React from "react";
import "./APPage.css";
import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { Link, useNavigate, useParams } from "react-router-dom";

const APPage = () => {
  const { apName } = useParams();

  const apData = [
    {
      name: "Varun Kumar",
      link: "https://t.me-3423412/lkadf",
      tableData: [
        {
          date: "01/04/2024",
          user: "9898981923",
          amount: 1000,
          ra: "Eeshee Pal Singh",
          subscription: "Service"
        },
        {
          date: "01/04/2024",
          user: "7987897973",
          amount: 1000,
          ra: "Eeshee Pal Singh",
          subscription: "Service"
        },
      ]
    },
    {
      name: "Parvez Alam",
      link: "https://t.me-897893/kjalkdf",
      tableData: [
        {
          date: "02/04/2024",
          user: "7897233234",
          amount: 1000,
          ra: "Kishan Pal Singh",
          subscription: "Service"
        },
        {
          date: "01/04/2024",
          user: "7987897973",
          amount: 1000,
          ra: "Subhash Pal Singh",
          subscription: "Service"
        },
      ]
    },
    // Add more AP data as needed
  ];

  const navigate = useNavigate();

  // Find the AP data based on the provided apName parameter
  const selectedAP = apData.find(ap => ap.name === apName);

  if (!selectedAP) {
    return <div>AP not found</div>;
  }

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
      <div className="requestContainer mx-5 bg-[#fff]">
        <div className="requestHeading flex justify-between items-center text-2xl font-bold p-4">
          <h2 className="pl-3 text-xl font-semibold">{selectedAP.name}</h2>
          <div className="channelOptions flex place-content-between px-6">
            <div className="chatLinks flex">
              <h3 className="mr-2 channel-heads text-lg">Link:</h3>
              <p className="text-lg">{selectedAP.link}</p>
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
              {selectedAP.tableData.map((data, index) => (
                <tr key={index} className="request-numbers font-semibold">
                  <td className="p-3">{data.date}</td>
                  <td className="p-3">
                    <Link to={`/${apName}/${data.user}`}>{data.user}</Link>
                  </td>
                  <td className="p-3 text-center">{data.amount}</td>
                  <td className="p-3 text-center">{data.ra}</td>
                  <td className="p-3 text-center">{data.subscription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default APPage;
