import { MenuItem, Select, Switch, TextField } from "@mui/material";
import React from "react";
import close from "../../assets/close.png";

const CPDiscountPopupAP = ({ closeCPDiscount }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup bg-white border-1 border-[#ffffff2a] m-4 rounded-lg w-3/4 text-center">
        <div className="bg-[#dddddd] px-4 py-2 rounded-t-lg flex justify-between items-center">
          <h2 className="text-left font-semibold text-2xl">Add CP Discount</h2>
          <div className="flex items-center">
           
            <button onClick={closeCPDiscount}>
              <img className="w-8 h-8" src={close} alt="close" />
            </button>
          </div>
        </div>

        <form className="px-12 py-4 grid grid-cols-2 grid-rows-2 my-4 gap-8 text-left">
          
        <TextField
            select
            id="AP"
            name="AP"
            label="AP"
            variant="outlined"
            fullWidth
            required
          >
            <MenuItem value="Type1">AP1</MenuItem>
            <MenuItem value="Type2">AP2</MenuItem>
            <MenuItem value="Type3">AP3</MenuItem>
          </TextField><TextField
            id="Discount"
            name="name"
            label="Discount"
            variant="outlined"
            fullWidth
            required
          />
             
          

          <TextField
            
            id="validTo"
            name="validTo"
            variant="outlined"
            label="validTo"
            fullWidth
            required
          ></TextField>
            <TextField
            
            id="validFrom"
            name="validFrom"
            variant="outlined"
            label="validFrom"
            fullWidth
            required
          ></TextField>
            
         
        </form>
        <button className="px-12 bg-blue-500 text-white py-2 mb-8 border-2 rounded-lg">Add</button>
      </div>
    </div>
  );
};

export default CPDiscountPopupAP;
