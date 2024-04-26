
import PageHeader from "../Header/Header";
import "./Blog.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { FaPen } from "react-icons/fa";
import Bin from '../../assets/TrashBinMinimalistic.png'
import BlogPage from "../BlogPage/BlogPage";

const Blog = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader
        title="Blogs"
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
                    <th style={{textAlign: "left", paddingLeft: "2rem"}}>Date</th>
                    <th style={{textAlign: "left"}}>Blog Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{textAlign: "left", paddingLeft: "2rem"}}>Anuj Kumar</td>
                    <td style={{textAlign: "left"}} className="text-blue-600">100</td>
                    <td className="text-green-600 flex justify-center items-center gap-6"><FaPen className="text-blue-600"/><img className="w-6 h-6" src={Bin} alt="" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <BlogPage onClose = {handleClosePopup} />}
      <ToastContainer />
    </div>
  );
};

export default Blog;
