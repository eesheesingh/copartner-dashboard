import React, { useState } from "react";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import close from '../../assets/close.png';

function AdAgencyPopup ({ onClose }) {
  const [agencyName, setagencyName] = useState("");
  const [landingPageLink, setlandingPageLink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Blog Title:", agencyName);
    console.log("Landing Page Link:", landingPageLink);
    setagencyName("");
    setlandingPageLink("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] p-4 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">Add</h2>
          <button onClick={onClose}><img className="w-8 h-8 mr-4" src={close} alt="" /></button>
        </div>
        <div className="font-semibold text-2xl p-12 flex flex-col gap-12 text-left">
          <div className="relative flex flex-col w-1/2">
            <TextField
              id="blog-title"
              label="Agency Name"
              value={agencyName}
              onChange={(e) => setagencyName(e.target.value)}
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
              id="landing-page-link"
              label="Landing Page Link"
              value={landingPageLink}
              onChange={(e) => setlandingPageLink(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <button className="px-12 bg-blue-500 text-white py-2 border-2 rounded-lg mb-8" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AdAgencyPopup;
