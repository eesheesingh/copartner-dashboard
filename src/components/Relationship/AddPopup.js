import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import closeIcon from "../../assets/close.png";
import { toast } from "react-toastify";

const AddPopup = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    email: "",
    document: null,
    mobile: "",
  });

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData({
      ...formData,
      [id]: files[0],
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const uploadFile = async (file, prefix) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const uploadResponse = await fetch(
      `https://copartners.in:5134/api/AWSStorage?prefix=${prefix}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file");
    }

    const uploadData = await uploadResponse.json();
    return uploadData.data.presignedUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadFile(formData.image, "Images");
      const documentUrl = await uploadFile(formData.document, "Images");

      const newManager = {
        imagePath: imageUrl,
        documentPath: documentUrl,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
      };

      const saveResponse = await fetch("https://copartners.in:5134/api/RelationshipManager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newManager),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save relationship manager");
      }

      const result = await saveResponse.json();
      console.log(result)
      onSave();
      toast.success("Relationship manager added successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save relationship manager");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] px-4 py-2 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">Add Relationship Manager</h2>
          <button onClick={onClose}>
            <img className="w-8 h-8 mr-4" src={closeIcon} alt="Close" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-12 py-4 grid grid-cols-2 text-center gap-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <TextField
              id="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              id="email"
              label="Email ID"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="document">Upload Document</label>
            <input
              type="file"
              id="document"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              required
            />
            <TextField
              id="mobile"
              label="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
