import React from "react";
import { FaPen } from "react-icons/fa";
import Bin from "../../assets/TrashBinMinimalistic.png";

const WithRA = ({ activeButton, data, openSubAdmin }) => {
  return (
    <>
      <div className="channel-heading flex">
        <h3 className="text-xl font-semibold mr-auto">{activeButton}</h3>
        <button onClick={openSubAdmin} className="border-2 border-black rounded-lg px-4 py-1 mr-4">
          + Add
        </button>
      </div>
      <div className="py-4 px-8">
        <table className="table-list">
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Name</th>
              <th style={{ textAlign: "left" }}>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                  {item.name}
                </td>
                <td style={{ textAlign: "left" }}>{item.email}</td>
                <td>{item.password}</td>
                <td className="flex justify-center items-center gap-6">
                  <FaPen className="text-blue-600 cursor-pointer" />
                  <img
                    className="w-6 h-6 cursor-pointer"
                    src={Bin}
                    alt="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WithRA;
