import "./RAList.css";
import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { useNavigate } from "react-router-dom";

const RADetail = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      {/* Page Header */}
      <PageHeader
        title="RA Listing"
        searchQuery=""
        setSearchQuery={() => {}}
        hasNotification={false} // Adjust as needed
        setHasNotification={() => {}} // Adjust as needed
      />

      {/* Back Button */}
      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate("/r.a")}
        >
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {/* Additional Divs below Request Page */}
      <div className="requestContainer mx-5 bg-[#fff]">
        <div className="requestHeading flex justify-between items-center text-2xl font-bold p-4">
          <h2 className="pl-3 text-xl font-semibold">Anuj Kumar</h2>
        </div>
        {/* Similar Channel Options from Explore Page */}
        

        {/* Table Layout */}
        <div className="requestTable px-5 pb-3">
          <table className="request-table">
            <thead>
              <tr className="requestColumns">
                <th className="text-left">Date</th>
                <th className="text-left">Users</th>
                <th>Come by A.P</th>
                <th>Amount Paid</th>
                <th>Subscription</th>
              </tr>
            </thead>
            <tbody>
              <tr className="request-numbers font-semibold">
                <td className="p-3">01/04/2024</td>
                <td className="p-3">9898981923</td>
                <td className="p-3 text-center">Varun Kumar</td>
                <td className="p-3 text-yellow-400 text-center">1000</td>
                <td className="p-3 text-center">Service</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RADetail;
