import React, { useCallback, useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PageHeader from "../Header/Header";
import RAPopup from "./RAPopup";

const Personal = ({data}) => {
  const [activeButton, setActiveButton] = useState("button1");
  const [popup, setPopup] = useState({
    isOpen: false,
    item: null,
    mode: "edit",
  });

  const handleOpenPopup = useCallback(async (item, mode = "edit") => {
    if (mode === "edit" || mode === "view") {
      try {
        const response = await fetch(
          `https://copartners.in:5132/api/Experts/${item.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedData = await response.json();
        setPopup({ isOpen: true, item: fetchedData.data, mode });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch RA Details");
      }
    } else {
      setPopup({ isOpen: true, item: null, mode });
    }
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup({ isOpen: false, item: null, mode: "edit" });
  }, []);

  const handleSave = useCallback(
    (item) => {
      if (popup.mode === "view") {
        handleClosePopup();
        return;
      }

      const newData =
        popup.mode === "edit"
          ? data.map((dataItem) =>
              dataItem.id === item.id ? { ...dataItem, ...item } : dataItem
            )
          : [
              ...data,
              {
                ...item,
                id:
                  data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1,
              },
            ];

      handleClosePopup();
    },
    [data, popup.mode]
  );

  return (
    <div className="dashboard-view-section mb-4">
      <div className="table-list-mb">
        <div className="channel-heading flex">
          <h3 className="text-xl font-semibold mr-auto">Listing</h3>
          <button
            className="border-2 border-black rounded-lg px-4 py-1 mr-4"
            onClick={() => handleOpenPopup(null, "add")}
            aria-label="Add new RA detail"
          >
            + Add
          </button>
        </div>
        <div className="py-4 px-8">
          <table className="table-list">
            <thead>
              <tr>
                <th>Join Date</th>
                <th>R.A</th>
                <th>SEBI No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr className="even:bg-gray-100 odd:bg-white" key={item.id}>
                  <td>{new Date(item.joinDate).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/r.a/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>{item.sebiNo}</td>
                  <td className="text-green-600 flex justify-center items-center gap-6">
                    <button
                      onClick={() => handleOpenPopup(item, "edit")}
                      aria-label={`Edit ${item.RAName}`}
                    >
                      <FaPen className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleOpenPopup(item, "view")}
                      aria-label={`View ${item.RAName}`}
                    >
                      <IoEyeSharp className=" text-blue-500 text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {popup.isOpen && (
        <RAPopup
          onClose={handleClosePopup}
          onSave={handleSave}
          mode={popup.mode}
          initialValues={popup.item || {}}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Personal;
