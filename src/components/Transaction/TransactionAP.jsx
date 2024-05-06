import React from "react";
import { Link } from "react-router-dom";

const TransactionAP = () => {
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
              <tr>
                <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                  01/04/2024
                </td>
                <td style={{ textAlign: "left" }} className="text-blue-600">
                  <Link to="/agency">Arun Kumar</Link>
                </td>
                <td style={{ textAlign: "left" }}>8787878728</td>
                <td>3000</td>
                <td>
                  <label for="R.A request">Select</label>

                  <select name="R.A request" id="R.A request">
                    <option value="accept">Accept</option>
                    <option value="reject">Reject</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionAP;
