import React, { useState, useEffect } from "react";
import { Input, Select, MenuItem, TextField, Switch } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import close from "../../assets/close.png";

function RAPopup({ onClose, onSave, mode, initialValues }) {
  const [currentMode, setCurrentMode] = useState(mode);
  const isViewMode = currentMode === "view";
  const [formData, setFormData] = useState({
    RAName: "",
    SEBI: "",
    Mobile: "",
    MailId: "",
    Type: "",
    Experience: "",
    Followers: "",
    CommissionFix: "",
    ChannelLink: "",
    PremiumLink: "",
    ProfileImg: "",
    Documents: null,
    Active: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if ((currentMode === "edit" || currentMode === "view") && initialValues) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...initialValues,
      }));
    } else if (currentMode === "add") {
      setFormData({
        RAName: "",
        SEBI: "",
        Mobile: "",
        MailId: "",
        Type: "",
        Experience: "",
        Followers: "",
        CommissionFix: "",
        ChannelLink: "",
        PremiumLink: "",
        ProfileImg: "",
        Documents: null,
        Active: true,
      });
    }
  }, [currentMode, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    // Validation for mobile number
    if (name === "Mobile") {
      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(value)) {
        newErrors = { ...newErrors, Mobile: "Invalid mobile number" };
      } else {
        delete newErrors.Mobile;
      }
    }

    // Validation for email
    if (name === "MailId") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        newErrors = { ...newErrors, MailId: "Invalid email address" };
      } else {
        delete newErrors.MailId;
      }
    }

    // Validation for commission fix
    if (name === "CommissionFix" && parseInt(value) > 100) {
      newErrors = {
        ...newErrors,
        CommissionFix: "Commission fix cannot exceed 100%",
      };
    } else {
      delete newErrors.CommissionFix;
    }

    setErrors(newErrors);
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, Documents: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMode === "add" || currentMode === "edit") {
      onSave(formData);
    }
  };

  const renderFields = (fields) => {
    return fields.map((field) => {
      const isFieldFilled = !!formData[field.name];
      const isDisabled =
        currentMode === "view" ||
        (currentMode === "edit" &&
          (field.name === "RAName" || field.name === "SEBI"));

      const inputClasses = `w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${
        isFieldFilled && !isViewMode ? "bg-gray-100" : ""
      }`;

      return (
        <div key={field.name}>
          {field.type === "file" ? (
            <Input
              type="file"
              name={field.name}
              fullWidth
              required={field.required}
              disabled={isDisabled}
              inputProps={field.inputProps}
              onChange={handleFileChange}
              className={inputClasses}
            />
          ) : field.name === "Type" ? (
            <Select
              label={field.label}
              value={formData[field.name]}
              name={field.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required={field.required}
              disabled={isDisabled}
              className={`${inputClasses} h-14`}
            >
              <MenuItem value={1}>Future & Options</MenuItem>
              <MenuItem value={2}>Equity</MenuItem>
              <MenuItem value={3}>Commodity</MenuItem>
            </Select>
          ) : (
            <TextField
              label={field.label}
              value={formData[field.name]}
              name={field.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required={field.required}
              disabled={isDisabled}
              InputProps={
                field.type === "file"
                  ? { type: "file", onChange: handleFileChange }
                  : null
              }
              inputProps={field.inputProps}
              className={inputClasses}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
            />
          )}
        </div>
      );
    });
  };

  const formFields = [
    { name: "RAName", label: "R.A Name", required: true },
    { name: "SEBI", label: "SEBI No.", required: true },
    { name: "Mobile", label: "Mobile Number", required: true },
    { name: "MailId", label: "Mail ID", required: true },
    { name: "Type", label: "Type", required: true },
    { name: "Experience", label: "Experience", required: true },
    { name: "Followers", label: "Followers", required: true },
    { name: "CommissionFix", label: "Commission Fix", required: true },
    { name: "ChannelLink", label: "Telegram Channel Link", required: true },
    { name: "PremiumLink", label: "Premium Channel Link", required: true },
    {
      name: "ProfileImg",
      label: "Profile Image",
      required: true,
      type: "file",
      inputProps: { accept: "image/*" },
    },
    {
      name: "Documents",
      label: "Document",
      required: true,
      type: "file",
      inputProps: { accept: ".pdf,.doc,.docx" },
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-left font-semibold text-2xl">
            {currentMode === "add"
              ? "Add RA"
              : currentMode === "edit"
              ? "Edit RA"
              : "View RA"}
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
          className="p-12 grid grid-cols-2 gap-8 text-left"
        >
          {renderFields(formFields)}
          {currentMode !== "view" ? (
            <button
              className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {currentMode === "add" ? "Add" : "Save Changes"}
            </button>
          ) : (
            <button
              className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setCurrentMode("edit")}
              disabled={currentMode === "edit"}
            >
              Change
            </button>
          )}
        </form>
        <div className="flex justify-center mt-4"></div>
      </div>
    </div>
  );
}

export default RAPopup;
