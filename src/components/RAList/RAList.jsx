import React from "react";
import "./RAList.css";
import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";

const RAList = () => {
  const { raName } = useParams();
  const navigate = useNavigate();

  const raData = [
    {
      name: "Anuj Kumar",
      detailData: [
        {
          date: "01/04/2024",
          users: "9898981923",
          apName: "Varun Kumar",
          amount: 1000,
          subscription: "Service",
        },
      ],
    },
    {
      name: "Kapil Sharma",
      detailData: [
        {
          date: "02/04/2024",
          users: "7987897973",
          apName: "Shyam Benegal",
          amount: 1200,
          subscription: "Premium",
        },
      ],
    },
  ];

  const selectedRA = raData.find((ra) => ra.name === raName);

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

      {!selectedRA ? (
        <div className="flex items-center justify-center mt-28 text-3xl font-bold p-6">
          R.A details not found for {raName}
        </div>
      ) : (
        <div className="requestContainer mx-5 bg-[#fff]">
          <div className="requestHeading flex justify-between items-center text-2xl font-bold p-4">
            <h2 className="pl-3 text-xl font-semibold">{selectedRA.name}</h2>
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
                {selectedRA.detailData.map((data, index) => (
                  <tr key={index} className="request-numbers font-semibold">
                    <td className="p-3">{data.date}</td>
                    <td className="p-3">{data.users}</td>
                    <td className="p-3 text-center">{data.apName}</td>
                    <td className="p-3 text-yellow-400 text-center">
                      {data.amount}
                    </td>
                    <td className="p-3 text-center">{data.subscription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RAList;
