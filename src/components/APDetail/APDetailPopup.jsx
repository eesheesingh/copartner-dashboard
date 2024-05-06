import React, { useState, useEffect } from "react";
import { Switch, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import close from "../../assets/close.png";

function APDetailPopup({ onClose, onSave, mode, initialValues, onChangeMode }) {
  const [currentMode, setCurrentMode] = useState(mode);
  const isViewMode = currentMode === "view";
  const [formData, setFormData] = useState({
    APName: "",
    Mobile: "",
    MailId: "",
    PAN: "",
    GSTNo: "",
    CommissionFix1: "",
    CommissionFix2: "",
    Active: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    initializeFormData();
  }, [currentMode, initialValues]);

  const initializeFormData = () => {
    const defaultFormData = {
      APName: "",
      Mobile: "",
      MailId: "",
      PAN: "",
      GSTNo: "",
      CommissionFix1: "",
      CommissionFix2: "",
      Active: true,
    };

    if ((currentMode === "edit" || currentMode === "view") && initialValues) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...initialValues,
      }));
    } else if (currentMode === "add") {
      setFormData(defaultFormData);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    // Validation for Mobile number
    if (id === "Mobile" && !/^\d{10}$/.test(value)) {
      newErrors.Mobile = "Invalid mobile number";
    } else {
      delete newErrors.Mobile;
    }

    // Validation for email
    if (id === "MailId") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        newErrors.MailId = "Invalid email address";
      } else {
        delete newErrors.MailId;
      }
    }

    // Validation for Commission Fix 1
    if (id === "CommissionFix1" && (isNaN(value) || value < 0 || value > 100)) {
      newErrors.CommissionFix1 =
        "Commission Fix 1 must be a number between 0 and 100";
    } else {
      delete newErrors.CommissionFix1;
    }

    // Validation for Commission Fix 2
    if (id === "CommissionFix2" && (isNaN(value) || value < 0 || value > 100)) {
      newErrors.CommissionFix2 =
        "Commission Fix 2 must be a number between 0 and 100";
    } else {
      delete newErrors.CommissionFix2;
    }

    setErrors(newErrors);
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMode === "add" || currentMode === "edit") {
      if (Object.keys(errors).length === 0) {
        onSave(formData);
      } else {
        toast.error("Please fix the errors in the form");
      }
    } else {
      toast.error("Please fill the form");
    }
  };

  const fields = [
    { id: "APName", label: "A.P", required: true },
    { id: "Mobile", label: "Mobile Number", required: true },
    { id: "MailId", label: "Mail ID", required: true },
    { id: "PAN", label: "PAN Card Number", required: true },
    { id: "GSTNo", label: "GST Number", required: true },
    { id: "CommissionFix1", label: "CM. Fix 1", required: true },
    { id: "CommissionFix2", label: "CM. Fix 2", required: true },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] p-4 rounded-t-lg flex justify-between">
          <h2 className="text-left font-semibold text-2xl">
            {mode === "add" ? "Add" : mode === "edit" ? "Edit" : "View"}
          </h2>
          <div className="flex items-center">
            {(currentMode === "edit" || currentMode === "view") && (
              <div className="flex items-center mr-4">
                <span className="mr-2">
                  {formData.Active ? "Active" : "Inactive"}
                </span>
                <Switch
                  checked={formData.Active}
                  onChange={(e) =>
                    setFormData({ ...formData, Active: e.target.checked })
                  }
                  color="primary"
                  disabled={currentMode === "view"}
                />
              </div>
            )}
            <button onClick={onClose}>
              <img className="w-8 h-8" src={close} alt="close" />
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-12 grid grid-cols-2 gap-6 text-left"
        >
          {fields.map((field) => (
            <TextField
              key={field.id}
              id={field.id}
              label={field.label}
              value={formData[field.id]}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required={field.required}
              InputLabelProps={{ shrink: true }}
              disabled={mode === "view"}
              error={!!errors[field.id]}
              helperText={errors[field.id]}
            />
          ))}
          {currentMode === "view" ? ( // Check if current mode is view
            <button
              className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onChangeMode} // Add onClick handler for the Change button
              disabled={currentMode === "edit"}
            >
              Change
            </button>
          ) : (
            <button
              className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {currentMode === "add" ? "Add" : "Save Changes"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default APDetailPopup;
