import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";

const Registration = ({ searchQuery, onTableData }) => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://copartners.in:5134/api/UserData/UserDataListing"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        if (data.isSuccess) {
          setUserData(data.data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;

    const filteredAndSortedData = userData
      .filter(
        (user) =>
          user.mobile.includes(searchQuery) &&
          (!start ||
            !end ||
            (new Date(user.date) >= start && new Date(user.date) <= end))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredData(filteredAndSortedData);
  }, [userData, searchQuery, dateRange]);

  return (
    <div className="py-4 px-8">
      <div className="w-full flex flex-row-reverse">
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
      <table className="table-list w-full mt-4">
        <thead>
          <tr>
            <th className="text-left pl-8">Date</th>
            <th className="text-left">User Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.userId}>
              <td className="text-left pl-8">
                {new Date(user.date).toLocaleDateString()}
              </td>
              <td className="text-left">{user.mobile}</td>
              <td>{user.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registration;
