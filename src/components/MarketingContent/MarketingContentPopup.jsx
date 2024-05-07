// MarketingContentPopup.js

import React, { useState } from "react";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import close from "../../assets/close.png";
import select from "../../assets/+ Add Currency.png";

function MarketingContentPopup({ onClose, contentType, onSave }) {
  const [inputLabel, setInputLabel] = useState("");
  const [contentName, setContentName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  useState(() => {
    setInputLabel(contentType === "Banners" ? "Banner Name" : "Video Name");
  }, [contentType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      name: contentName,
      image: selectedImage,
      video: selectedVideo,
    };
    onSave(newData);
    setContentName("");
    setSelectedImage(null);
    setSelectedVideo(null);
    onClose();
  };

  const handleSelectImageClick = () => {
    document.getElementById("image-upload").click();
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    setPreviewImage(URL.createObjectURL(imageFile));
  };

  const handleSelectVideoClick = () => {
    document.getElementById("video-upload").click();
  };

  const handleVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setSelectedVideo(videoFile);
    setPreviewVideo(URL.createObjectURL(videoFile));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] p-4 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">
            Add {contentType}
          </h2>
          <button onClick={onClose}>
            <img className="w-8 h-8 mr-4" src={close} alt="" />
          </button>
        </div>
        <div className="font-semibold text-2xl p-12 flex gap-12 text-left">
          <div className="flex flex-col gap-4">
            {contentType === "Banners" ? (
              <>
                <label htmlFor="image-upload">Upload Title Image</label>
                <img
                  className="w-96 cursor-pointer"
                  src={select}
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
              </>
            ) : (
              <>
                <label htmlFor="video-upload">Upload Video</label>
                <img
                  className="w-96 cursor-pointer"
                  src={select}
                  alt="Select"
                  onClick={handleSelectVideoClick}
                />
                <input
                  type="file"
                  id="video-upload"
                  accept="video/*"
                  onChange={handleVideoChange}
                  style={{ display: "none" }}
                />
              </>
            )}
            <div className="relative flex flex-col w-1/2">
              <TextField
                id="content-name"
                label={inputLabel}
                value={contentName}
                onChange={(e) => setContentName(e.target.value)}
                variant="outlined"
                fullWidth
                required
              />
            </div>
          </div>
          <div>
            {previewImage && (
              <img className="w-96" src={previewImage} alt="Preview" />
            )}
            {previewVideo && (
              <video className="w-96" controls>
                <source src={previewVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
        <button
          className="px-12 bg-blue-500 text-white py-2 border-2 rounded-lg mb-8"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default MarketingContentPopup;
