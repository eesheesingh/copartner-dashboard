import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import Bin from "../../assets/TrashBinMinimalistic.png";
import { toast } from "react-toastify";
import AddAffiliatePartner from "./AddAffiliatePartner";

const ApAdmin = ({ activeButton }) => {
  const [data, setData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://copartners.in:5130/api/Users?userType=AP"
      );
      const result = await response.json();
      if (result.isSuccess) {
        setData(result.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch affiliate partner data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://copartners.in:5130/api/Users/${id}`,
        {
          method: "DELETE",
        }
      );
      toast.success("Affiliate partner deleted successfully!");
      fetchData(); // Refetch data to update the list
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to delete affiliate partner");
    }
  };

  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = () => {
    fetchData();
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="channel-heading flex">
        <h3 className="text-xl font-semibold mr-auto">{activeButton}</h3>
        <button
          className="border-2 border-black rounded-lg px-4 py-1 mr-4"
          onClick={handleAddClick}
        >
          + Add
        </button>
      </div>
      <div className="py-4 px-8">
        <table className="table-list">
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Name</th>
              <th style={{ textAlign: "left" }}>Email</th>
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
                {/* Typically, passwords are not displayed. */}
                <td className="flex justify-center items-center gap-6">
                  <img
                    className="w-6 h-6 cursor-pointer"
                    src={Bin}
                    alt="Delete"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPopupOpen && (
        <AddAffiliatePartner onClose={handleClosePopup} onSave={handleSave} />
      )}
    </>
  );
};

export default ApAdmin;
