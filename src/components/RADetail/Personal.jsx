import React, { useCallback, useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageHeader from "../Header/Header";
import RAPopup from "./RAPopup";

const Personal = () => {
  const [activeButton, setActiveButton] = useState("button1");
  const [popup, setPopup] = useState({
    isOpen: false,
    item: null,
    mode: "edit",
  });

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

  const handleOpenPopup = useCallback((item, mode = "edit") => {
    setPopup({ isOpen: true, item, mode });
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

      setData(newData);
      handleClosePopup();
    },
    [data, popup.mode]
  );

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

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
                  <td>{item.joinDate}</td>
                  <td>
                    <Link to={`/r.a/${item.RAName}`}>{item.RAName}</Link>
                  </td>
                  <td>{item.SEBI}</td>
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
