import React, { useState } from "react";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import close from '../../assets/close.png'
import select from '../../assets/+ Add Currency.png'

function BlogPage({onClose}) {
  // State to manage input values
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Blog Title:", blogTitle);
    console.log("Blog Description:", blogDescription);
    console.log("Selected Image:", selectedImage);
    setBlogTitle("");
    setBlogDescription("");
    setSelectedImage(null);
    onClose();
  };

  const handleSelectImageClick = () => {
    document.getElementById("image-upload").click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-[white] border-[1px] border-[#ffffff2a] m-4 rounded-lg w-3/4 h-[90%] text-center">
        <div className="bg-[#dddddd] p-4 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">Add</h2>
          <button onClick={onClose}><img className="w-8 h-8 mr-4" src={close} alt="" /></button>
        </div>
        <div className="font-semibold text-2xl p-12 flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-4">
            <label htmlFor="image-upload">Upload Title Image</label>
            <img
              className="w-96 cursor-pointer"
              src={select}
              alt="Select"
              onClick={handleSelectImageClick}
            />
            {/* Hidden file input */}
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
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
          />
          </div>
        </div>
        <button className="px-12 bg-blue-500 text-white py-2 border-2 rounded-lg" onSubmit={handleSubmit} type="submit">
          Add
        </button>
      </div>
    </div>
  );
}

export default BlogPage;
