import { MenuItem, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import close from "../../assets/close.png";

const AgencyPopup = ({ onClose, selectedAgency, onSubmit }) => {
  const [RAName, setRAName] = useState("");
  const [link, setLink] = useState("");
  const [RAList, setRAList] = useState([]);

  useEffect(() => {
    if (selectedAgency) {
      setRAName(selectedAgency.agencyName);
      setLink(selectedAgency.link);
    } else {
      setRAName("");
      setLink("");
    }
  }, [selectedAgency]);

  useEffect(() => {
    const fetchRAList = async () => {
      try {
        const response = await fetch('https://copartners.in:5132/api/Experts');
        if (!response.ok) {
          throw new Error('Failed to fetch RA list');
        }
        const data = await response.json();
        console.log(data)
        setRAList(data.data);
      } catch (error) {
        console.error('Error fetching RA list:', error);
      }
    };

    fetchRAList();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!RAName.trim() || !link.trim()) {
      alert("Please fill out all fields");
      return;
    }

    const formData = { name: RAName, link };

    if (selectedAgency) {
      onSubmit(selectedAgency.id, formData);
    } else {
      onSubmit(formData);
    }

    setRAName("");
    setLink("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] px-4 py-2 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">
            {selectedAgency ? "Edit" : "Add"}
          </h2>
          <button onClick={onClose}>
            <img className="w-8 h-8 mr-4" src={close} alt="" />
          </button>
        </div>
        <div className="font-semibold text-2xl px-12 py-4 flex flex-col gap-4 text-left">
          <div className="relative flex flex-col w-1/2">
            <TextField
              select
              id="RA-name"
              label="RA"
              value={RAName}
              onChange={(e) => setRAName(e.target.value)}
              variant="outlined"
              fullWidth
              required
            >
              {RAList.map((ra) => (
                <MenuItem key={ra.id} value={ra.name}>
                  {ra.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex flex-col">
            <TextField
              id="link"
              label="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              required
            />
          </div>
        </div>
        <button
          className="px-12 bg-blue-500 text-white py-2 border-2 rounded-lg mb-8"
          onClick={handleSubmit}
        >
          {selectedAgency ? "Save Changes" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AgencyPopup;
