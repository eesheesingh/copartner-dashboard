import { FaAngleLeft, FaPen } from "react-icons/fa";
import PageHeader from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import Bin from "../../assets/TrashBinMinimalistic.png";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import AgencyPopup from "./AgencyPopup";

const AgencyID = () => {
  const navigate = useNavigate();
  const { agencyName } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [agencies, setAgencies] = useState([
    {
      id: 1,
      name: "Zestify",
      link: "Lorem, ipsum dolor. dummy text",
      userCount: 90,
    },
    {
      id: 2,
      name: "Copartner",
      link: "Lorem, ipsum dolor. dummy text",
      userCount: 80,
    },
  ]);

  const agency = agencies.find((agency) => agency.name === agencyName);

  const handleDeleteAgency = (id) => {
    const updatedAgencies = agencies.filter((agency) => agency.id !== id);
    setAgencies(updatedAgencies);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Agency"
        searchQuery=""
        setSearchQuery={() => {}}
        hasNotification={false}
        setHasNotification={() => {}}
      />

      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {agency && (
        <div className="requestContainer mx-5 bg-[#fff]">
          <div className="channel-heading flex">
            <h3 className="text-xl font-semibold mr-auto">Ad Agency</h3>
            <button
              className="border-2 border-black rounded-lg px-4 py-1 mr-4"
              onClick={() => setIsPopupOpen(true)}
            >
              + Add
            </button>
          </div>
          <div className="py-4 px-8">
            <table className="table-list">
              <thead>
                <tr className="requestColumns">
                  <th className="text-left">R1</th>
                  <th className="text-left">Link</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr key={agency.id} className="request-numbers font-semibold">
                  <td className="p-3">{agency.name}</td>
                  <td className="p-3">{agency.link}</td>
                  <td className="p-3 text-center text-blue-400">
                    {agency.userCount}
                  </td>
                  <td className="flex justify-center items-center gap-6">
                    <FaPen className="text-blue-600 cursor-pointer" />
                    <img
                      className="w-6 h-6 cursor-pointer"
                      src={Bin}
                      alt="Delete"
                      onClick={() => handleDeleteAgency(agency.id)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!agency && (
        <div className="flex items-center justify-center mt-28 text-3xl font-bold p-6">
          Agency not found!
        </div>
      )}
      {isPopupOpen && <AgencyPopup onClose={handleClosePopup} />}
      <ToastContainer />
    </div>
  );
};

export default AgencyID;
