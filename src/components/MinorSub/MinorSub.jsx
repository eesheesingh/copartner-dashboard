import React, { useState, useEffect } from "react";
import PageHeader from "../Header/Header";
import Bin from "../../assets/TrashBinMinimalistic.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MinorSub = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to map typeId to service type
  const getExpertType = (typeId) => {
    switch (parseInt(typeId)) {
      case 1:
        return "Commodity";
      case 2:
        return "Equity";
      case 3:
        return "Options";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://copartners.in:5009/api/Subscription"
        );
        const result = await response.json();
        if (result.isSuccess) {
          // Filter to only include items with isSpecialSubscription as true
          const filteredData = result.data.filter(
            (item) => item.isSpecialSubscription
          );
          setData(filteredData);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://copartners.in:5009/api/Subscription/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Remove the item from the state
          setData(data.filter((item) => item.id !== id));
          toast.success("Item deleted successfully!");
        } else {
          toast.error("Failed to delete the item.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the item.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container p-0 sm:ml-60">
      <PageHeader title="Minor Subscription" />

      <div className="dashboard-view-section mb-4">
        <div className="table-list-mb">
          <div className="channel-heading flex">
            <h3 className="text-xl font-semibold mr-auto">Listing</h3>
            <button className="border-2 border-black rounded-lg px-4 py-1 mr-4">
              + Add
            </button>
          </div>

          <div className="py-4 px-8">
            <table className="table-list">
              <thead>
                <tr>
                  <th>Join Date</th>
                  <th>R.A. Name</th>
                  <th>Subscription</th>
                  <th>Service Type</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr className="even:bg-gray-100 odd:bg-white" key={item.id}>
                    <td>{new Date(item.createdOn).toLocaleDateString()}</td>
                    <td>{item.experts.name}</td>
                    <td>{item.planType}</td>
                    <td>{getExpertType(item.serviceType)}</td>
                    <td className="text-red-600">
                      ₹{Math.round(item.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="text-green-600 flex justify-center items-center gap-6">
                      <button
                        aria-label={`Delete ${item.experts.name}`}
                        onClick={() => handleDelete(item.id)}
                      >
                        <img
                          className="w-6 h-6 cursor-pointer"
                          src={Bin}
                          alt="Delete"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MinorSub;
