import React, { useState, useEffect } from "react";
import { MenuItem, TextField } from "@mui/material";
import close from "../../assets/close.png";

const CPDiscountPopupAP = ({ closeCPDiscount }) => {
  const [affiliatePartners, setAffiliatePartners] = useState([]);
  const [selectedAP, setSelectedAP] = useState('');
  const [discount, setDiscount] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');

  useEffect(() => {
    const fetchAffiliatePartners = async () => {
      try {
        const response = await fetch('https://copartners.in:5133/api/AffiliatePartner?page=1&pageSize=10');
        if (!response.ok) {
          throw new Error("Failed to fetch affiliate partners");
        }
        const data = await response.json();
        setAffiliatePartners(data.data || []);
      } catch (error) {
        console.error("Error fetching affiliate partners:", error);
      }
    };

    fetchAffiliatePartners();
  }, []);

  const handleAddDiscount = async () => {
    const cpapId = selectedAP; // Use the selected Affiliate Partner's ID as cpapId
    const referralMode = "AP"; // Default referral mode
    const couponCode = `COPAP${discount}`; // Generate the coupon code based on discount

    const payload = {
      cpapId,
      referralMode,
      couponCode,
      discountPercentage: parseInt(discount, 10), // Convert discount to integer
      discountValidFrom: validFrom,
      discountValidTo: validTo,
      isActive: true,
    };

    try {
      const response = await fetch('https://copartners.in:5009/api/RefferalCoupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Discount added successfully");
        // Optionally, add code here to handle success (e.g., closing the popup, showing a success message)
      } else {
        throw new Error("Failed to add discount");
      }
    } catch (error) {
      console.error("Error:", error);
      // Optionally, add code here to handle the error (e.g., showing an error message)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] px-4 py-2 rounded-t-lg flex justify-between items-center">
          <h2 className="text-left font-semibold text-2xl">Add AP Discount</h2>
          <div className="flex items-center">
            <button onClick={closeCPDiscount}>
              <img className="w-8 h-8" src={close} alt="close" />
            </button>
          </div>
        </div>

        <form
          className="px-12 py-4 grid grid-cols-2 grid-rows-2 my-4 gap-8 text-left"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form from refreshing the page
            handleAddDiscount(); // Call the function to add the discount
          }}
        >
          <TextField
            select
            id="AP"
            name="AP"
            label="Affiliate Partner"
            variant="outlined"
            fullWidth
            required
            value={selectedAP}
            onChange={(e) => setSelectedAP(e.target.value)}
          >
            {affiliatePartners.map((partner) => (
              <MenuItem key={partner.id} value={partner.id}>
                {partner.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="Discount"
            name="discount"
            label="Discount"
            variant="outlined"
            fullWidth
            required
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
             
          <TextField
            id="validTo"
            name="validTo"
            variant="outlined"
            label="Valid To"
            fullWidth
            required
            value={validTo}
            onChange={(e) => setValidTo(e.target.value)}
          />

          <TextField
            id="validFrom"
            name="validFrom"
            variant="outlined"
            label="Valid From"
            fullWidth
            required
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
          />

          <button
            type="submit"
            className="col-span-2 px-12 bg-blue-500 text-white py-2 mb-8 border-2 rounded-lg"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CPDiscountPopupAP;
