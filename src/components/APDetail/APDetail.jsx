import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PageHeader from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa"; // Replaced delete icon with eye icon
import APDetailPopup from "./APDetailPopup";
import { IoEyeSharp } from "react-icons/io5";

const APDetail = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      joinDate: "01/04/2024",
      APName: "Arun Kumar",
      Mobile: "8788789891",
      CommissionFix1: "",
      CommissionFix2: "",
      Spend: 2000,
    },
    {
      id: 2,
      joinDate: "01/04/2024",
      APName: "Mithun Kumar",
      Mobile: "7890873272",
      CommissionFix1: "23",
      CommissionFix2: "35",
      Spend: 2000,
    },
  ]);

  const handleOpenPopup = (item, mode = "edit") => {
    if (mode === "view") {
      setViewItem(item);
      setIsPopupOpen(true);
    } else {
      setIsPopupOpen(true);
      setEditItem(item);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditItem(null);
    setViewItem(null);
  };

  const handleSave = (item) => {
    if (viewItem) {
      handleClosePopup();
      return;
    }
  
    if (editItem) {
      setData(
        data.map((dataItem) =>
          dataItem.id === editItem.id ? { ...dataItem, ...item } : dataItem
        )
      );
    } else {
      const newItem = {
        ...item,
        id: data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1,
      };
      setData([...data, newItem]);
    }
    handleClosePopup();
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="A.P Details"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="table-list-mb">
            <div className="channel-heading flex">
              <h3 className="text-xl font-semibold mr-auto">Listing</h3>
              <button
                className="border-2 border-black rounded-lg px-4 py-1 mr-4"
                onClick={() => handleOpenPopup(null, "add")}
              >
                + Add
              </button>
            </div>
            <div className="m-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Join Date</th>
                    <th>A.P</th>
                    <th>Mobile Number</th>
                    <th>CM. Fix 1</th>
                    <th>CM. Fix 2</th>
                    <th>Spend</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr className="even:bg-gray-100 odd:bg-white" key={item.id}>
                      <td>{item.joinDate}</td>
                      <td>
                        <Link to={`/ap-name/${item.id}`}>{item.APName}</Link>
                      </td>
                      <td>{item.Mobile}</td>
                      <td>{item.CommissionFix1}</td>
                      <td>{item.CommissionFix2}</td>
                      <td className="text-red-600">{item.Spend}</td>
                      <td className="text-green-600 flex justify-center items-center gap-6">
                      <button
                        onClick={() => handleOpenPopup(item)}
                        aria-label="Edit"
                      >
                        <FaPen className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleOpenPopup(item, "view")} // Set viewing mode
                        aria-label="View"
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
        </div>
      </div>
      {(isPopupOpen && !viewItem) && (
        <APDetailPopup
          onClose={handleClosePopup}
          onSave={handleSave}
          mode={editItem ? "edit" : "add"}
          initialValues={editItem || {}}
        />
      )}
      {viewItem && (
        <APDetailPopup
          onClose={handleClosePopup}
          onSave={handleSave}
          mode="view"
          initialValues={viewItem}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default APDetail;
