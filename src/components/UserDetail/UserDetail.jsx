import "./UserDetail.css";
import { FaAngleLeft } from "react-icons/fa6";
import PageHeader from "../Header/Header";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      {/* Page Header */}
      <PageHeader
        title="Explore"
        searchQuery=""
        setSearchQuery={() => {}}
        hasNotification={false} // Adjust as needed
        setHasNotification={() => {}} // Adjust as needed
      />

      {/* Back Button */}
      <div className="back-button flex items-center text-2xl font-bold p-6">
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate("/a.p")}
        >
          <FaAngleLeft />
          <span className="ml-1">Back</span>
        </button>
      </div>

      {/* Additional Divs below Request Page */}
      <div className="requestContainer mx-5 bg-[#fff]">
        <div className="requestHeading flex items-center text-2xl font-bold p-4">
          <h2 className="pl-3">Varun Kumar :</h2>
          <div className="channelOptions flex place-content-between px-6">
            8909090910
          </div>
        </div>
        {/* Similar Channel Options from Explore Page */}

        {/* Table Layout */}
        <div className="requestTable px-5 pb-3">
          <table className="request-table">
            <thead>
              <tr className="requestColumns">
                <th className="text-left">Date</th>
                <th>Amount Pay</th>
                <th>R.A</th>
                <th>Subscription</th>
              </tr>
            </thead>
            <tbody>
              <tr className="request-numbers font-semibold">
                <td>01/04/2024</td>
                <td className="text-center">1000</td>
                <td className="text-center">Eeshee Pal Singh</td>
                <td className="text-center">Service</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
