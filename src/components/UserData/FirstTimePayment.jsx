import React, { useState, useEffect } from "react";

const FirstTimePayment = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://copartners.in:5134/api/UserData/UserFirstTimePaymentListing");
        const data = await response.json();
        if (data.isSuccess) {
          setPayments(data.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          {payments.map((payment) => (
            <tr key={payment.userId}>
              <td style={{ textAlign: "left", paddingLeft: "2rem" }}>{new Date(payment.date).toLocaleDateString()}</td>
              <td style={{ textAlign: "left" }}>{payment.mobile}</td>
              <td>{payment.name || "-"}</td>
              <td>{payment.payment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirstTimePayment;
