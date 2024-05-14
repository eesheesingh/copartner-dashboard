import React, { useState, useEffect } from "react";
import { Input, MenuItem, TextField, Switch, InputLabel } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import close from "../../assets/close.png";

function RAPopup({ onClose, onSave, mode, initialValues }) {
  const [currentMode, setCurrentMode] = useState(mode);
  const [copartnerChecked, setCopartnerChecked] = useState(true);
  const isViewMode = currentMode === "view";
  const [formData, setFormData] = useState({
    name: "",
    sebiRegNo: "",
    mobileNumber: "",
    email: "",
    expertTypeId: "",
    experience: "",
    channelName: "",
    rating: "",
    telegramFollower: "",
    fixCommission: "",
    telegramChannel: "",
    premiumTelegramChannel: "",
    expertImagePath: null,
    sebiRegCertificatePath: null,
    isCoPartner: true,
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues && (mode === "edit" || mode === "view")) {
      setFormData({ ...initialValues });
      setCopartnerChecked(initialValues.isCoPartner);
    }
  }, [mode, initialValues]);

  const handleCopartnerChange = () => {
    setCopartnerChecked(!copartnerChecked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "mobileNumber") {
      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(value)) {
        newErrors.mobileNumber = "Invalid mobile number";
      } else {
        delete newErrors.mobileNumber;
      }
    }

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        newErrors.email = "Invalid email address";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "fixCommission") {
      if (parseInt(value) > 100) {
        newErrors.fixCommission = "Commission fix cannot exceed 100%";
      } else {
        delete newErrors.fixCommission;
      }
    }

    setErrors(newErrors);
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      alert("Please correct the inputs before submitting.");
      return;
    }

    const dataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSubmit.append(key, formData[key]);
    });

    dataToSubmit.set("isCoPartner", copartnerChecked);

    const url = currentMode === "add" ? "https://copartners.in:5132/api/Experts" : `https://copartners.in:5132/api/Experts/${formData.id}`;
    const method = currentMode === "add" ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        body: dataToSubmit,
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const responseData = await response.json();
      onSave(responseData);
      toast.success("Data saved successfully");
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data");
    }
  };

  const renderFields = (fields) => {
    return fields.map((field) => {
      const isFieldFilled = !!formData[field.name];
      const isDisabled =
        currentMode === "view" ||
        (currentMode === "edit" &&
          (field.name === "name" || field.name === "sebiRegNo")) ||
        (field.name === "fixCommission" && !copartnerChecked);

      const inputClasses = `w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${
        isFieldFilled && !isViewMode ? "bg-gray-100" : ""
      }`;

      return (
        <div key={field.name}>
          {field.type === "file" ? (
            <div>
              <InputLabel name={field.name}>{field.label}</InputLabel>
              <Input
                type="file"
                name={field.name}
                label={field.label}
                fullWidth
                required={field.required}
                disabled={isDisabled}
                inputProps={field.inputProps}
                onChange={handleFileChange}
                className={inputClasses}
              />
            </div>
          ) : field.name === "expertTypeId" ? (
            <TextField
              select
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
            </TextField>
          ) : (
            <TextField
              label={field.label}
              value={formData[field.name]}
              name={field.name}
              onChange={handleChange}
              type={field.type || "text"}
              variant="outlined"
              fullWidth
              required={field.required}
              disabled={isDisabled}
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
    { name: "name", label: "R.A Name", required: true },
    { name: "sebiRegNo", label: "SEBI No.", required: true },
    { name: "mobileNumber", label: "Mobile Number", required: true, type: "number" },
    { name: "email", label: "Mail ID", required: true },
    { name: "expertTypeId", label: "Type", required: true },
    { name: "experience", label: "Experience", required: true, type: "number" },
    { name: "channelName", label: "Channel Name", required: true },
    { name: "rating", label: "Rating", required: true, type: "number" },
    { name: "telegramFollower", label: "Followers", required: true, type: "number" },
    {
      name: "fixCommission",
      label: "Commission Fix",
      type: "number",
    },
    { name: "telegramChannel", label: "Telegram Channel Link", required: true },
    { name: "premiumTelegramChannel", label: "Premium Channel Link", required: true },
    {
      name: "expertImagePath",
      label: "Profile Image",
      type: "file",
      required: true,
      inputProps: { accept: "image/*" },
    },
    {
      name: "sebiRegCertificatePath",
      label: "Document",
      required: true,
      type: "file",
      inputProps: { accept: ".pdf,.doc,.docx" },
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] px-4 py-2 rounded-t-lg flex justify-between items-center">
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
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
                <Switch
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
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
          className="px-12 py-4 grid grid-cols-2 gap-4 text-left"
        >
          {renderFields(formFields)}
          <div className="relative flex items-center col-span-2">
            <input
              type="checkbox"
              id="copartnerCheckbox"
              checked={copartnerChecked}
              onChange={handleCopartnerChange}
              className="md:w-4 w-6 md:h-4 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="copartnerCheckbox"
              className="ml-3 text-sm text-gray-500 dark:text-gray-400"
            >
              Become Copartner
            </label>
          </div>
          {currentMode !== "view" ? (
            <button
              className="col-span-2 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {currentMode === "add" ? "Add" : "Save Changes"}
            </button>
          ) : (
            <button
              className="col-span-2 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setCurrentMode("edit")}
              disabled={currentMode === "edit"}
            >
              Edit
            </button>
          )}
        </form>
        <div className="flex justify-center mt-4"></div>
      </div>
    </div>
  );
}

export default RAPopup;
