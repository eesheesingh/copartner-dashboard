import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import close from "../../assets/close.png";
import select from "../../assets/+ Add Currency.png";

function BlogPage({ onClose, blog = null, onSubmit }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Set initial data if editing an existing blog
  useEffect(() => {
    if (blog) {
      setBlogTitle(blog.title);
      setBlogDescription(blog.description);
      setSelectedImage(blog.image);
    }
  }, [blog]);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("description", blogDescription);
    formData.append("blogImagePath", selectedImage);

    try {
      let response;
      if (blog) {
        console.log(blog.id);
        response = await fetch(
          `https://copartners.in:5134/api/Blogs/${blog.id}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("update");
      } else {
        response = await fetch("https://copartners.in:5134/api/Blogs", {
          method: "POST",
          body: formData,
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        console.log("create new");
      }

      if (!response.ok) {
        throw new Error("Failed to submit blog");
      }

      const responseData = await response.json();
      console.log(responseData);
      if (onSubmit) {
        onSubmit(responseData);
      }

      setBlogTitle("");
      setBlogDescription("");
      setSelectedImage(null);
      onClose();
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const handleSelectImageClick = () => {
    document.getElementById("image-upload").click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-[white] border-[1px] border-[#ffffff2a] m-4 rounded-lg w-3/4 h-[90%] text-center">
        <div className="bg-[#dddddd] px-4 py-2 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">
            {blog ? "Edit" : "Add"} Blog
          </h2>
          <button onClick={onClose}>
            <img className="w-8 h-8 mr-4" src={close} alt="Close" />
          </button>
        </div>
        <div className="font-semibold text-2xl px-12 py-4 flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-4">
            <label htmlFor="image-upload">Upload Title Image</label>
            <img
              className="w-96 cursor-pointer"
              src={selectedImage ? URL.createObjectURL(selectedImage) : select}
              alt="Select"
              onClick={handleSelectImageClick}
            />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="relative flex flex-col">
            <TextField
              id="blog-title"
              label="Blog Title"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="flex flex-col">
            <TextField
              id="blog-description"
              label="Blog Description"
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              required
              rows={4}
            />
          </div>
        </div>
        <button
          className="px-12 bg-blue-500 text-white py-2 border-2 rounded-lg"
          onClick={handleFormSubmit}
          type="button"
        >
          {blog ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default BlogPage;
