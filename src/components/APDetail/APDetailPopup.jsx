import React, { useState, useEffect } from "react";
import { Switch, TextField, Button, Input, InputLabel } from "@mui/material";
import close from "../../assets/close.png";

function APDetailPopup({ onClose, onSave, mode, initialValues, onChangeMode }) {
  const [currentMode, setCurrentMode] = useState(mode);
  const [formData, setFormData] = useState({
    APName: "",
    Mobile: "",
    MailId: "",
    PAN: "",
    GSTNo: "",
    CommissionFix1: "",
    CommissionFix2: "",
    Active: true,
    ProfileImg: null,
    Documents: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if ((currentMode === "edit" || currentMode === "view") && initialValues) {
      setFormData({ ...formData, ...initialValues });
    } else {
      setFormData({
        ...formData,
        APName: "",
        Mobile: "",
        MailId: "",
        PAN: "",
        GSTNo: "",
        CommissionFix1: "",
        CommissionFix2: "",
        Active: true,
        ProfileImg: null,
        Documents: null,
      });
    }
  }, [currentMode, initialValues]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    const newErrors = { ...errors };

    if (files) {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
      return;
    }

    if (id === "Mobile") {
      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(value)) {
        newErrors.Mobile = "Invalid mobile number";
      } else {
        delete newErrors.Mobile;
      }
    }

    if (id === "MailId") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        newErrors.MailId = "Invalid email address";
      } else {
        delete newErrors.MailId;
      }
    }

    if (id === "CommissionFix1") {
      if (parseInt(value) > 100) {
        newErrors.CommissionFix1 = "Commission fix cannot exceed 100%";
      } else {
        delete newErrors.CommissionFix1;
      }
    }

    if (id === "CommissionFix2") {
      if (parseInt(value) > 100) {
        newErrors.CommissionFix2 = "Commission fix cannot exceed 100%";
      } else {
        delete newErrors.CommissionFix2;
      }
    }

    setErrors(newErrors);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("Please correct the inputs before submitting.");
      return;
    }
    if (currentMode === "add" || currentMode === "edit") {
      onSave(formData);
    }
  };

  const fields = [
    { id: "APName", label: "A.P", required: true },
    { id: "Mobile", label: "Mobile Number", required: true, type: "number" },
    { id: "MailId", label: "Mail ID", required: true },
    { id: "PAN", label: "PAN Card Number", required: true },
    { id: "GSTNo", label: "GST Number", required: true },
    {
      id: "CommissionFix1",
      label: "CM. Fix 1",
      required: true,
      type: "number",
    },
    {
      id: "CommissionFix2",
      label: "CM. Fix 2",
      required: true,
      type: "number",
    },
    {
      id: "ProfileImg",
      label: "Profile Image",
      required: true,
      type: "file",
      inputProps: { accept: "image/*" },
    },
    {
      id: "Documents",
      label: "Document",
      required: true,
      type: "file",
      inputProps: { accept: ".pdf,.doc,.docx" },
    },
    {
      id: "ReferralLink",
      label: "Referral Link",
      type: "text",
      displayInModes: ["edit", "view"],
    },
    {
      id: "ReferralCode",
      label: "Referral Code",
      type: "text",
      displayInModes: ["edit", "view"],
    },
  ];

  const inputClasses = `w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] px-4 py-2 rounded-t-lg flex justify-between items-center">
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
            <Button onClick={onClose}>
              <img className="w-8 h-8" src={close} alt="close" />
            </Button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-12 py-4 grid grid-cols-2 gap-6 text-left"
        >
          {fields.map((field) => {
            // Check if the field should be displayed based on the mode
            const shouldDisplay =
              !field.displayInModes || field.displayInModes.includes(mode);

            // If the field should not be displayed, return null
            if (!shouldDisplay) return null;

            // Determine if the field should be disabled based on the mode and the field ID
            const isDisabled =
              mode === "view" ||
              field.id === "ReferralLink" ||
              field.id === "ReferralCode";

            return field.type === "file" ? (
              field.id === "ProfileImg" || field.id === "Documents" ? null : (
                <div key={field.id}>
                  <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                  <Input
                    id={field.id}
                    type={field.type}
                    onChange={handleChange}
                    required={field.required}
                    {...field.inputProps}
                    disabled={isDisabled} // Apply disabled status
                    className={`${inputClasses} ${
                      !!formData[field.id] && currentMode === "view"
                        ? "bg-gray-100"
                        : ""
                    }`}
                  />
                </div>
              )
            ) : (
              <TextField
                key={field.id}
                id={field.id}
                label={field.label}
                value={formData[field.id] || ""} // Ensure value is never null
                type={field.type || "text"}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required={field.required}
                disabled={isDisabled} // Apply disabled status
                error={!!errors[field.id]}
                helperText={errors[field.id]}
                className={`${inputClasses} ${
                  !!formData[field.id] && currentMode === "view"
                    ? "bg-gray-100"
                    : ""
                }`}
              />
            );
          })}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {fields
              .filter((f) => f.type === "file")
              .map((field) => (
                <div key={field.id}>
                  <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                  <Input
                    id={field.id}
                    type={field.type}
                    onChange={handleChange}
                    required={field.required}
                    inputProps={field.inputProps}
                    disabled={mode === "view"}
                    className={inputClasses}
                  />
                </div>
              ))}
          </div>
          {currentMode === "view" ? (
            <button
              className="col-span-2 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
              onClick={onChangeMode}
              disabled={currentMode === "edit"}
            >
              Change
            </button>
          ) : (
            <button
              className="col-span-2 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
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
