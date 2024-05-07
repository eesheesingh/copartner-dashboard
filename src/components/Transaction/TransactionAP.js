import React, { useState } from "react";
import { Link } from "react-router-dom";
import RejectPopup from "./RejectPopup";
import AcceptPopup from "./AcceptPopup";
import { MenuItem, TextField } from "@mui/material";

const TransactionAP = () => {
  const [acceptPopupOpenForTransaction, setAcceptPopupOpenForTransaction] =
    useState(null);
  const [rejectPopupOpenForTransaction, setRejectPopupOpenForTransaction] =
    useState(null);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "01/04/2024",
      name: "Arun Kumar",
      mobile: "8787878728",
      amount: 3000,
      request: "",
    },
  ]);

  const handleAccept = (memberId) => {
    setAcceptPopupOpenForTransaction(memberId);
  };

  const handleReject = (memberId) => {
    setRejectPopupOpenForTransaction(memberId);
  };

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
              {transactions.map((member, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                    {member.date}
                  </td>
                  <td style={{ textAlign: "left" }} className="text-blue-600">
                    <Link to={`${member.name}`}>{member.name}</Link>
                  </td>
                  <td style={{ textAlign: "left" }}>{member.mobile}</td>
                  <td>{member.amount}</td>
                  <td>
                    <TextField
                      select
                      label={"Select"}
                      name={`request-${member.id}`}
                      id={`request-${member.id}`}
                      variant="outlined"
                      fullWidth
                      value={member.request}
                      onChange={(e) => {
                        const updatedTransactions = transactions.map((t) =>
                          t.id === member.id
                            ? { ...t, request: e.target.value }
                            : t
                        );
                        setTransactions(updatedTransactions);
                      }}
                    >
                      <MenuItem
                        onClick={() => handleAccept(member.id)}
                        value="accept"
                      >
                        Accept
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleReject(member.id)}
                        value="reject"
                      >
                        Reject
                      </MenuItem>
                    </TextField>
                    {acceptPopupOpenForTransaction === member.id && (
                      <AcceptPopup
                        memberId={member.id}
                        onClose={() => setAcceptPopupOpenForTransaction(null)}
                      />
                    )}
                    {rejectPopupOpenForTransaction === member.id && (
                      <RejectPopup
                        memberId={member.id}
                        onClose={() => setRejectPopupOpenForTransaction(null)}
                      />
                    )}
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
