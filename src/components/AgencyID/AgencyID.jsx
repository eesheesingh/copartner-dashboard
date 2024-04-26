
import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";

const APPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      {/* Page Header */}
      <PageHeader
        title="Agency"
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
          <h2 className="pl-3 text-xl font-semibold">Ad Agency</h2>
          <div className="channelOptions flex place-content-between px-6">
          <div className="chatLinks flex">
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
                <th className="text-left">R1</th>
                <th className="text-left">Link</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              <tr className="request-numbers font-semibold">
                <td className="p-3">Agency1</td>
                <td className="p-3">Lorem, ipsum dolor. dummy text</td>
                <td className="p-3 text-center text-blue-400">80</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default APPage;
