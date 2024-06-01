import React, { useState, useEffect } from "react";

const Registration = ({ searchQuery, onTableData }) => {
  const [userData, setUserData] = useState([]);

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

  const filteredData = userData.filter((user) =>
    user.mobile.includes(searchQuery)
  );

  return (
    <div className="py-4 px-8">
      <div className="w-full flex flex-row-reverse">
        <button onClick={() => onTableData(filteredData)} className="border-2 border-black rounded-lg px-4 py-1 mr-4">
          Download Sheet
        </button>
      </div>
      <table className="table-list">
        <thead>
          <tr>
            <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Date</th>
            <th style={{ textAlign: "left" }}>User Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.userId}>
              <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                {new Date(user.date).toLocaleDateString()}
              </td>
              <td style={{ textAlign: "left" }}>{user.mobile}</td>
              <td>{user.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registration;
