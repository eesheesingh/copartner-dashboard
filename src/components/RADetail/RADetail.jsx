// Dashboard.jsx
import { useState } from "react";
import "./RADetail.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PageHeader from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Bin from '../../assets/TrashBinMinimalistic.png'
import RAPopup from "./RAPopup";

const RADetail = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  // const handleError = (err) =>
  //   toast.info(err, {
  //     position: "bottom-left",
  //   });
  // const handleSuccess = (message) =>
  //   toast.success(message, {
  //     position: "bottom-left",
  //   });

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="RA Details"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="my-8 table-list-mb">
            <div className="channel-heading flex">
              <h3 className="text-xl font-semibold mr-auto">Listing</h3>
              <button className=" border-2 border-black rounded-lg px-4 py-1 mr-4" onClick={() => setIsPopupOpen(true)}>+ Add</button>
            </div>
            <div className="m-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Join Date</th>
                    <th>R.A</th>
                    <th>SEBI No.</th>
                    <th>Commission Fix</th>
                    <th>Spend</th>
                    <th>Documents</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-gray-100 odd:bg-white">
                    <td>01/04/2024</td>
                    <td><Link to="/ra-name">Anuj Kumar</Link></td>
                    <td>0802929384</td>
                    <td><input type="text" placeholder="Enter Commission" style={{fontSize: "small", fontWeight: "normal"}} className="text-center shadow text-gray-700 leading-tight focus:outline-none focus:shadow-outline p-1.5 text-sm appearance-none border rounded" /></td>
                    <td className="text-red-600">2000</td>
                    <td style={{textAlign: "center"}}><button>Upload</button></td>
                    <td className="text-green-600 flex justify-center items-center gap-6"><FaPen className="text-blue-600"/><img className="w-6 h-6" src={Bin} alt="" /></td>
                  </tr>
                  <tr>
                    <td>01/04/2024</td>
                    <td><Link to="/ra-name">Anuj Kumar</Link></td>
                    <td>0802929384</td>
                    <td><input type="text" placeholder="Enter Commission" style={{fontSize: "small", fontWeight: "normal"}} className="text-center shadow text-gray-700 leading-tight focus:outline-none focus:shadow-outline p-1.5 text-sm appearance-none border rounded" /></td>
                    <td className="text-red-600">2000</td>
                    <td style={{textAlign: "center"}}><button>Upload</button></td>
                    <td className="text-green-600 flex justify-center items-center gap-6"><FaPen className="text-blue-600"/><img className="w-6 h-6" src={Bin} alt="" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <RAPopup onClose = {handleClosePopup} />}
      <ToastContainer />
    </div>
  );
};

export default RADetail;
