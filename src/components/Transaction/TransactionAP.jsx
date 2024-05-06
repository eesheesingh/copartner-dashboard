import React from "react";
import { Link } from "react-router-dom";

const TransactionAP = () => {
  const transactions = [
    {
      id: 1,
      date: "01/04/2024",
      name: "Arun Kumar",
      mobile: "8787878728",
      amount: 3000,
    },
  ];

  return (
    <div className="dashboard-view-section mb-4">
      <div className="table-list-mb">
        <div className="channel-heading">
          <h3 className="text-xl font-semibold">Listing</h3>
        </div>
        <div className="py-4 px-8">
          <table className="table-list">
            <thead>
              <tr>
                <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Date</th>
                <th style={{ textAlign: "left" }}>A.P Name</th>
                <th style={{ textAlign: "left" }}>Mobile No.</th>
                <th>Amount</th>
                <th>Request</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                    {transaction.date}
                  </td>
                  <td style={{ textAlign: "left" }} className="text-blue-600">
                    <Link to={`${transaction.name}`}>
                      {transaction.name}
                    </Link>
                  </td>
                  <td style={{ textAlign: "left" }}>{transaction.mobile}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <label htmlFor="R.A request">Select</label>
                    <select name="R.A request" id="R.A request">
                      <option value="accept">Accept</option>
                      <option value="reject">Reject</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionAP;
