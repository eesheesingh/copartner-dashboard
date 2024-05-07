import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../Header/Header";

const TransactionID = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [selectedAP, setSelectedAP] = useState([
    {
      name: "Krishan Shrivastava",
      link: "www.zestify.com",
      tableData: [
        {
          AccNumber: "897979678",
          IFSC: "HJKSH8998609",
          BankName: "HDFC",
          upiId: "lakshay@897897123",
          ra: "Arun Kumar",
          Amount: "3000",
        },
        {
          AccNumber: "89707896786",
          IFSC: "SBINIU6U78",
          BankName: "SBI",
          upiId: "parvez@9879879823",
          ra: "Varun Kumar",
          Amount: "1000",
        },
      ],
    },
    {
      name: "Shivam Rajpal",
      link: "www.copartner.com",
      tableData: [
        {
          AccNumber: "659867909",
          IFSC: "SOUIDYF96976",
          BankName: "Standard Chartered",
          upiId: "ankit@897961",
          ra: "Deepak Choudhary",
          Amount: "2000",
        },
      ],
    },
  ]);

  const transactions = selectedAP.find(
    (transaction) => transaction.name === transactionId
  );

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Transaction ID"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {transactions ? (
        <div className="requestContainer mx-5 bg-[#fff]">
          <div className="requestHeading flex justify-between items-center text-2xl font-bold p-4">
            <h2 className="pl-3 text-xl font-semibold">{transactions.name}</h2>
          </div>

          <div className="py-4 px-8">
            <table className="table-list">
              <thead>
                <tr className="requestColumns">
                  <th className="text-left">Account Number</th>
                  <th className="text-left">IFSC Code</th>
                  <th>Bank Name</th>
                  <th>Account Holder Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.tableData.map((data, index) => (
                  <tr key={index} className="request-numbers font-semibold">
                    <td className="p-3">{data.AccNumber}</td>
                    <td className="p-3">{data.IFSC}</td>
                    <td className="p-3 text-center">{data.BankName}</td>
                    <td className="p-3 text-center">{data.ra}</td>
                    <td className="p-3 text-center">{data.Amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4 px-8">
            <table className="table-list">
              <thead>
                <tr className="requestColumns">
                  <th style={{textAlign: "left", paddingLeft: "5rem"}}>UPI Id</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.tableData.map((data, index) => (
                  <tr key={index} className="request-numbers font-semibold">
                    <td style={{textAlign: "left", paddingLeft: "5rem"}} className="p-3">{data.upiId}</td>
                    <td className="p-3 text-center">{data.Amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-28 text-3xl font-bold p-6">
          Transaction not found!
        </div>
      )}
    </div>
  );
};

export default TransactionID;
