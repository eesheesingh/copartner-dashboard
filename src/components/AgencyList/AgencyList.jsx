import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PageHeader from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import AdAgencyPopup from "./AdAgencyPopup";
import Bin from "../../assets/TrashBinMinimalistic.png";
import { FaPen } from "react-icons/fa";

const AgencyList = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [agencyList, setAgencyList] = useState([
    {
      id: 1,
      date: "01/04/2024",
      name: "Zestify",
      link: "ad1",
      users: 3000,
    },
    {
      id: 2,
      date: "01/04/2024",
      name: "Copartner",
      link: "ad2",
      users: 3000,
    },
    {
      id: 3,
      date: "01/04/2024",
      name: "HailGro",
      link: "ad3",
      users: 3000,
    },
  ]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAgency(null);
  };

  const handleDeleteAgency = (id) => {
    const updatedAgencies = agencyList.filter((agency) => agency.id !== id);
    setAgencyList(updatedAgencies);
  };

  const handleEditAgency = (agency) => {
    if (agency) {
      // Editing an existing agency
      setSelectedAgency(agency);
    } else {
      // Adding a new agency
      setSelectedAgency(null);
    }
    setIsPopupOpen(true);
  };

  const handleSubmitAgency = (formData) => {
    if (selectedAgency) {
      // Editing an existing agency
      const updatedAgencies = agencyList.map((agency) =>
        agency.id === selectedAgency.id ? { ...agency, ...formData } : agency
      );
      setAgencyList(updatedAgencies);
    } else {
      // Adding a new agency
      const newAgency = {
        id: agencyList.length + 1,
        date: new Date().toLocaleDateString(),
        ...formData,
      };
      setAgencyList([...agencyList, newAgency]);
    }
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Ad Agency Details"
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
                onClick={() => handleEditAgency(null)} // Add button
              >
                + Add
              </button>
            </div>
            <div className="py-4 px-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Agency Name</th>
                    <th>Landing Page Link</th>
                    <th>Users</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agencyList.map((agency) => (
                    <tr key={agency.id}>
                      <td style={{ fontWeight: "700" }}>{agency.date}</td>
                      <td
                        style={{ fontWeight: "700" }}
                        className="text-blue-400"
                      >
                        <Link to={`${agency.name}`}>{agency.name}</Link>
                      </td>
                      <td>{agency.link}</td>
                      <td>{agency.users}</td>
                      <td className="flex justify-center items-center gap-6">
                        <FaPen
                          className="text-blue-600 cursor-pointer"
                          onClick={() => handleEditAgency(agency)} // Edit button
                        />
                        <img
                          onClick={() => handleDeleteAgency(agency.id)}
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
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <AdAgencyPopup
          onClose={handleClosePopup}
          selectedAgency={selectedAgency}
          onSubmit={handleSubmitAgency}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AgencyList;
