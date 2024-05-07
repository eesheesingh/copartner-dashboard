import React from "react";
import document from "../../assets/Document.png";
import { FaPen } from "react-icons/fa";
import Bin from "../../assets/TrashBinMinimalistic.png";

const Listing = ({ activeButton, data }) => {
  return (
    <>
      <div className="channel-heading flex">
        <h3 className="text-xl font-semibold mr-auto">{activeButton}</h3>
        <button className="border-2 border-black rounded-lg px-4 py-1 mr-4">
          + Add
        </button>
      </div>
      <div className="py-4 px-8">
        <table className="table-list">
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Date</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th>Number</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                  {item.date}
                </td>
                <td style={{ textAlign: "left" }}>{item.name}</td>
                <td>{item.number}</td>
                <td>
                  <button>
                    <img className="w-5" src={document} alt="document" />
                  </button>
                </td>
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

export default Listing;
