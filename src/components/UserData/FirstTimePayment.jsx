import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";

const FirstTimePayment = ({ searchQuery, onTableData }) => {
  const [payments, setPayments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://copartners.in:5134/api/UserData/UserFirstTimePaymentListing?page=1&pageSize=100000"
        );
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

  useEffect(() => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;

    const filteredAndSortedData = payments
      .filter(
        (user) =>
          user.mobile.includes(searchQuery) && !user.isSpecialSubscription &&
          (!start ||
            !end ||
            (new Date(user.date) >= start && new Date(user.date) <= end))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredData(filteredAndSortedData);
    setCount(filteredAndSortedData.length);
  }, [payments, searchQuery, dateRange]);

  const determineUserType = (userData) => {
    if (userData.apId) {
      return "AP";
    } else if (userData.raId) {
      return "RA";
    } else {
      return "CP";
    }
  };

  return (
    <div className="py-4 px-8">
      <div className="w-full flex flex-row-reverse">
        <div>Count: {count}</div>
        <button
          onClick={() => onTableData(filteredData)}
          className="border-2 border-black rounded-lg px-4 py-1 mr-4"
        >
          Download Sheet
        </button>
        <button
          onClick={() => setShowDatePicker(true)}
          className="border-2 border-black rounded-lg px-4 py-1 mr-4"
        >
          Select Date Range
        </button>
      </div>
      {showDatePicker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Select Date Range</h2>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDatePicker(false)}
                className="border-2 border-black rounded-lg px-4 py-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="table-list">
        <thead>
          <tr>
            <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Date</th>
            <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Time</th>
            <th style={{ textAlign: "left" }}>User Number</th>
            <th style={{ textAlign: "left" }}>Source</th>
            <th>Name</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((payment) => (
            <tr key={payment.userId}>
              <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                {new Date(payment.date).toLocaleDateString()}
              </td>
              <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                {new Date(payment.date).toLocaleTimeString()}
              </td>
              <td style={{ textAlign: "left" }}>{payment.mobile}</td>
              <td style={{ textAlign: "left" }}>
                {determineUserType(payment)}
              </td>
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
