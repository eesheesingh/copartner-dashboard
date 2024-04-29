import React, { useState } from "react";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import close from '../../assets/close.png';

function RAPopup ({ onClose }) {
  const [RAName, setRAName] = useState("");
  const [SEBI, setSEBI] = useState("");
  const [CommissionFix, setCommissionFix] = useState("");
  const [Document, setDocument] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Blog Title:", RAName);
    console.log("Landing Page Link:", SEBI);
    console.log("CM. Fix 1:", CommissionFix);
    console.log("CM. Fix 2:", Document);
    setRAName("");
    setSEBI("");
    setCommissionFix("");
    setDocument("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] p-4 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">Add</h2>
          <button onClick={onClose}><img className="w-8 h-8 mr-4" src={close} alt="" /></button>
        </div>
        <div className="font-semibold text-2xl p-12 grid grid-cols-2 gap-12 text-left">
          <div className="relative flex flex-col">
            <TextField
              id="blog-title"
              label="R.A"
              value={RAName}
              onChange={(e) => setRAName(e.target.value)}
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
              label="SEBI No."
              value={SEBI}
              onChange={(e) => setSEBI(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="flex flex-col">
            <TextField
              id="cm-fix-1"
              label="Commission Fix"
              value={CommissionFix}
              onChange={(e) => setCommissionFix(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="flex flex-col">
            <TextField
              id="cm-fix-2"
              label="Document"
              value={Document}
              onChange={(e) => setDocument(e.target.value)}
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

export default RAPopup;
