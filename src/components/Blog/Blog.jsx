import React, { useState } from "react";
import PageHeader from "../Header/Header";
import "./Blog.css";
import { ToastContainer, toast } from "react-toastify";
import { FaPen } from "react-icons/fa";
import Bin from '../../assets/TrashBinMinimalistic.png'
import BlogPage from "../BlogPage/BlogPage";

const Blog = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);  // To keep track of the blog being edited
  const [blogs, setBlogs] = useState([
    { id: 1, date: "2024-05-01", title: "Introduction to React" },
    { id: 2, date: "2024-04-15", title: "Advanced React Patterns" },
    // Add more blog data as needed
  ]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditBlog(null);  // Reset edit blog
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    toast.success("Blog deleted successfully!");
  };

  const handleAddEditBlog = (blogData, id) => {
    if (id) {
      setBlogs(blogs.map(blog => blog.id === id ? {...blog, ...blogData} : blog));
      toast.success("Blog updated successfully!");
    } else {
      const newBlog = {
        ...blogData,
        id: blogs.length + 1,  // Simple increment for ID, replace with better ID generation in production
        date: new Date().toISOString().split('T')[0]  // Current date
      };
      setBlogs([...blogs, newBlog]);
      toast.success("Blog added successfully!");
    }
    handleClosePopup();
  };

  const openAddBlog = () => {
    setIsPopupOpen(true);
    setEditBlog(null);
  };

  const openEditBlog = (blog) => {
    setIsPopupOpen(true);
    setEditBlog(blog);
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
          <div className="table-list-mb">
            <div className="channel-heading flex">
              <h3 className="text-xl font-semibold mr-auto">Listing</h3>
              <button className="border-2 border-black rounded-lg px-4 py-1 mr-4" onClick={openAddBlog}>+ Add</button>
            </div>
            <div className="py-4 px-8">
              <table className="table-list">
                <thead>
                  <tr>
                    <th style={{textAlign: "left", paddingLeft: "2rem"}}>Date</th>
                    <th style={{textAlign: "left"}}>Blog Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(blog => (
                    <tr key={blog.id}>
                      <td style={{textAlign: "left", paddingLeft: "2rem"}}>{blog.date}</td>
                      <td style={{textAlign: "left"}} className="text-blue-600">{blog.title}</td>
                      <td className="flex justify-center items-center gap-6">
                        <FaPen className="text-blue-600 cursor-pointer" onClick={() => openEditBlog(blog)} />
                        <img className="w-6 h-6 cursor-pointer" src={Bin} alt="Delete" onClick={() => handleDelete(blog.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <BlogPage blog={editBlog} onClose={handleClosePopup} onSubmit={handleAddEditBlog} />}
      <ToastContainer />
    </div>
  );
};

export default Blog;
