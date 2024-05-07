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
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [agencies, setAgencies] = useState([
    {
      id: 1,
      RAName: "Arun Kumar",
      name: "Zestify",
      link: "Lorem, ipsum dolor. dummy text",
      userCount: 90,
    },
    {
      id: 2,
      RAName: "Kapil Mishra",
      name: "Copartner",
      link: "ljkalksdf",
      userCount: 80,
    },
    {
      id: 3,
      RAName: "Ritik Kapoor",
      name: "Copartner",
      link: "adsfasdf",
      userCount: 80,
    },
    {
      id: 4,
      RAName: "Sheetal Choudhary",
      name: "Copartner",
      link: "qewrqwerqwer",
      userCount: 80,
    },
    {
      id: 5,
      RAName: "Kirti Kumari",
      name: "Copartner",
      link: "zcvzcvzcv",
      userCount: 80,
    },
    {
      id: 6,
      RAName: "Krishan Bagri",
      name: "Copartner",
      link: "Lorem, ipsum dolor. dummy text",
      userCount: 80,
    },
  ]);

  const filteredAgencies = agencies.filter(
    (agency) => agency.name === agencyName
  );

  const handleDeleteAgency = (id) => {
    const updatedAgencies = agencies.filter((agency) => agency.id !== id);
    setAgencies(updatedAgencies);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAgency(null);
  };

  const handleEditAgency = (agency) => {
    setSelectedAgency(agency);
    setIsPopupOpen(true);
  };

  const handleSubmit = (formData) => {
    if (selectedAgency) {
      const updatedAgencies = agencies.map((a) =>
        a.id === selectedAgency.id ? { ...a, ...formData } : a
      );
      setAgencies(updatedAgencies);
    } else {
      const newAgency = {
        id: agencies.length + 1,
        ...formData,
      };
      setAgencies([...agencies, newAgency]);
    }
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
                <th style={{textAlign: "left", paddingLeft: "4rem"}} className="text-left">RA Name</th>
                <th style={{textAlign: "left"}}>Link</th>
                <th style={{textAlign: "left"}}>User</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgencies.map((agency) => (
                <tr key={agency.id} className="request-numbers font-semibold">
                  <td style={{textAlign: "left", paddingLeft: "4rem"}} className="p-3">{agency.RAName}</td>
                  <td style={{textAlign: "left"}} className="p-3">{agency.link}</td>
                  <td style={{textAlign: "left"}} className="p-3 text-center text-blue-400">
                    {agency.userCount}
                  </td>
                  <td className="flex justify-center items-center gap-6">
                    <FaPen
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleEditAgency(agency)}
                    />
                    <img
                      className="w-6 h-6 cursor-pointer"
                      src={Bin}
                      alt="Delete"
                      onClick={() => handleDeleteAgency(agency.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupOpen && (
        <AgencyPopup
          onClose={handleClosePopup}
          selectedAgency={selectedAgency}
          onSubmit={handleSubmit}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AgencyID;
