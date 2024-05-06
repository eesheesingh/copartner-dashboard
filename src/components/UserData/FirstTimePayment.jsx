import React from "react";

const FirstTimePayment = () => {
  return (
    <div className="py-4 px-8">
      <table className="table-list">
        <thead>
          <tr>
          <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Date</th>
            <th style={{ textAlign: "left" }}>User Number</th>
            <th>Name</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
              01/04/2024
            </td>
            <td style={{ textAlign: "left" }}>
              98989889828
            </td>
            <td>Arun Kumar</td>
            <td>1000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FirstTimePayment;
