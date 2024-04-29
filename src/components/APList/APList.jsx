
import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";

const APList = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      {/* Page Header */}
      <PageHeader
        title="A.P Details"
        searchQuery=""
        setSearchQuery={() => {}}
        hasNotification={false} // Adjust as needed
        setHasNotification={() => {}} // Adjust as needed
      />

      {/* Back Button */}
      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate("/")}
        >
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {/* Additional Divs below Request Page */}
      <div className="requestContainer mx-5 bg-[#fff]">
        <div className="requestHeading flex justify-between items-center text-2xl font-bold p-4">
          <h2 className="pl-3 text-xl font-semibold">Arun Kumar</h2>
          <div className="channelOptions flex place-content-between px-6">
          <div style={{justifyContent: "space-around"}} className="chatLinks flex">
            <h3 className="mr-2 channel-heads text-lg">Link:</h3>
            <p className="text-lg">Lorem ipsum dolor dummy text</p>
          </div>
        </div>
        </div>
        {/* Similar Channel Options from Explore Page */}
        

        {/* Table Layout */}
        <div className="requestTable px-5 pb-3">
          <table className="request-table">
            <thead>
              <tr className="requestColumns">
                <th style={{paddingLeft: "2rem"}} className="text-left">Date</th>
                <th className="text-left">Users Come</th>
                <th>Users Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr className="request-numbers font-semibold">
                <td style={{paddingLeft: "2rem"}} className="p-3">01/04/2024</td>
                <td className="p-3">100</td>
                <td className="p-3 text-center text-blue-500"><Link to="/a.p">80</Link></td>
              </tr>
              <tr className="request-numbers font-semibold">
                <td style={{paddingLeft: "2rem"}} className="p-3">01/04/2024</td>
                <td className="p-3">100</td>
                <td className="p-3 text-center text-blue-500"><Link to="/a.p">80</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default APList;
