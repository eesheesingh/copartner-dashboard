import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { Link, useParams, useNavigate } from "react-router-dom";

const APList = () => {
  const navigate = useNavigate();
  const { apName } = useParams();

  const apDetails = [
    {
      id: 1,
      date: "01/04/2024",
      name: "Anuj Kumar",
      usersCome: 100,
      usersPay: 80,
    },
    {
      id: 2,
      date: "02/04/2024",
      name: "Arun Kumar",
      usersCome: 120,
      usersPay: 90,
    },
  ];

  const apDetail = apDetails.find((ap) => ap.name === apName);

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="A.P Details"
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

      {apDetail ? <div className="requestContainer mx-5 bg-[#fff]">
        <div className="requestHeading flex justify-between items-center text-2xl font-bold p-4">
          <h2 className="pl-3 text-xl font-semibold">{apName}</h2>
          <div className="channelOptions flex place-content-between px-6">
            <div style={{ justifyContent: "space-around" }} className="chatLinks flex">
              <h3 className="mr-2 channel-heads text-lg">Link:</h3>
              <p className="text-lg">Lorem ipsum dolor dummy text</p>
            </div>
          </div>
        </div>
        <div className="py-4 px-8">
          <table className="table-list">
            <thead>
              <tr className="requestColumns">
                <th style={{ textAlign: "left", paddingLeft: "2rem" }}>Date</th>
                <th style={{ textAlign: "left" }}>Users Come</th>
                <th>Users Pay</th>
              </tr>
            </thead>
            <tbody>
              {apDetails.map((ap) => (
                <tr key={ap.id} className="request-numbers font-semibold">
                  <td style={{ textAlign: "left", paddingLeft: "2rem" }} className="p-3">{ap.date}</td>
                  <td style={{ textAlign: "left" }} className="p-3">{ap.usersCome}</td>
                  <td className="p-3 text-center text-blue-500">
                    <Link to={`/${ap.name}`}>{ap.usersPay}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> : <div className="flex items-center justify-center mt-28 text-3xl font-bold p-6">
          AP not found!
        </div>}
    </div>
  );
};

export default APList;
