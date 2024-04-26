// Dashboard.jsx
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PageHeader from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const APDetail = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
        title="Explore"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasNotification={hasNotification}
        setHasNotification={setHasNotification}
      />

      <div className="p-4">
        <div className="dashboard-view-section mb-4">
          <div className="my-8 table-list-mb">
            <div className="channel-heading">
              <h3 className="text-xl font-semibold">Listing</h3>
            </div>
            <div className="m-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Join Date</th>
                    <th>A.P</th>
                    <th>Link</th>
                    <th>CM. Fix 1</th>
                    <th>CM. Fix 2</th>
                    <th>Spend</th>
                    <th>Earn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-gray-100 odd:bg-white">
                    <td>01/04/2024</td>
                    <td><Link to="/ap-name">Arun Kumar</Link></td>
                    <td>Lorem ipsum dolor...</td>
                    <td>70%</td>
                    <td>40%</td>
                    <td style={{fontWeight: "600"}} className="text-red-600 font-semibold p-3">2000</td>
                    <td style={{textAlign: "center"}} className="text-green-600">3000</td>
                  </tr>
                  <tr>
                    <td>01/04/2024</td>
                    <td><Link to="/ap-name">Arun Kumar</Link></td>
                    <td>Lorem ipsum dolor...</td>
                    <td>70%</td>
                    <td>40%</td>
                    <td style={{fontWeight: "600"}} className="text-red-600 font-semibold p-3">2000</td>
                    <td style={{textAlign: "center"}} className="text-green-600">3000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default APDetail;
