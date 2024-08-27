import React from "react";
import { FaPen } from "react-icons/fa";
import Bin from "../../assets/TrashBinMinimalistic.png";
import Clip from "../../assets/Clipboard.png";

const CPDiscountCP = () => {
  return (
    <div className="p-4">
      <div className="dashboard-view-section mb-4">
        <div className="table-list-mb">
         
          <div className="py-4 px-8">
            <table className="table-list">
              <thead>
                <tr>
                  <th style={{ textAlign: "left", paddingLeft: "2rem" }}>
                    Date
                  </th>
                  <th style={{ textAlign: "left" }}>Code</th>
                  <th>Discount</th>
                  <th>Valid to</th>
                  <th>Valid from</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "left", paddingLeft: "2rem" }}>
                    22-08-24
                  </td>
                  <td style={{ textAlign: "left" }}>COPAR20</td>
                  <td>20%</td>
                  <td>22-08-2024 | 10:AM</td>
                  <td>26-08-2024 | 10:00AM</td>
                  <td className="flex justify-center items-center gap-6">
                    <FaPen className="text-blue-600 cursor-pointer" />
                    <img
                      className="w-6 h-6 cursor-pointer"
                      src={Clip}
                      alt="Paste"
                    />
                    <img
                      className="w-6 h-6 cursor-pointer"
                      src={Bin}
                      alt="Delete"
                    />
                  </td>
                </tr>
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPDiscountCP;
