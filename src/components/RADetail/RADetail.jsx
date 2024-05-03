import { useState } from "react";
import "./RADetail.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PageHeader from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import RAPopup from "./RAPopup";
import { IoEyeSharp } from "react-icons/io5";

const RADetail = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null); // New state for viewing mode
  const [data, setData] = useState([
    {
      id: 1,
      joinDate: "01/04/2024",
      RAName: "Anuj Kumar",
      SEBI: "0802929384",
      CommissionFix: "10",
      Spend: 2000,
      Documents: "",
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
        title="RA Details"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
            <table className="table-list">
              <thead>
                <tr>
                  <th>Join Date</th>
                  <th>R.A</th>
                  <th>SEBI No.</th>
                  <th>Commission Fix</th>
                  <th>Spend</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr className="even:bg-gray-100 odd:bg-white" key={item.id}>
                    <td>{item.joinDate}</td>
                    <td>
                      <Link to={`/ra-name/${item.id}`}>{item.RAName}</Link>
                    </td>
                    <td>{item.SEBI}</td>
                    <td>{item.CommissionFix}%</td>
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
      {(isPopupOpen && !viewItem) && (
        <RAPopup
          onClose={handleClosePopup}
          onSave={handleSave}
          mode={editItem ? "edit" : "add"}
          initialValues={editItem || {}}
        />
      )}
      {viewItem && (
        <RAPopup
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

export default RADetail;
