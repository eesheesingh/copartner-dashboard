import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import close from "../../assets/close.png";
import select from "../../assets/+ Add Currency.png";

function MarketingContentPopup({ onClose, contentType, onSave }) {
  const [inputLabel, setInputLabel] = useState("");
  const [contentName, setContentName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setInputLabel(contentType === "Banners" ? "Banner Name" : "Video Name");
  }, [contentType]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("bannerName", contentName);
    formData.append("imagePath", selectedFile);
    formData.append("contentType", contentType.toLowerCase());

    try {
      const response = await fetch(
        "https://copartners.in:5134/api/MarketingContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      onSave(result);
      setContentName("");
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data");
    }
  };

  const handleSelectFileClick = () => {
    document.getElementById("file-upload").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] px-4 py-2 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">
            Add {contentType}
          </h2>
          <button onClick={onClose}>
            <img className="w-8 h-8 mr-4" src={close} alt="Close" />
          </button>
        </div>
        <div className="font-semibold text-2xl px-12 py-4 flex gap-12 text-left">
        <div className="flex flex-col gap-4">
            <label htmlFor="file-upload">
              {contentType === "Banners"
                ? "Upload Title Image"
                : "Upload Video"}
            </label>
            {contentType === "Banners" ? (
              <img
                className={`w-96 ${selectedFile ? "h-56" : ""} cursor-pointer`}
                src={selectedFile ? URL.createObjectURL(selectedFile) : select}
                alt="Select"
                onClick={handleSelectFileClick}
              />
            ) : (
              selectedFile ? (
                <video className="w-96 h-56" controls>
                  <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  className="w-96 cursor-pointer"
                  src={select}
                  alt="Select"
                  onClick={handleSelectFileClick}
                />
              )
            )}
            <input
              type="file"
              id="file-upload"
              accept={contentType === "Banners" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
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
          {/* <div>
            {previewFile && (
              contentType === "Banners" ? (
                <img className="w-96" src={previewFile} alt="Preview" />
              ) : (
                <video className="w-96" controls>
                  <source src={previewFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            )}
          </div> */}
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
