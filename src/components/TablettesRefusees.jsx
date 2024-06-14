import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useToken } from "../App";

const TablettesAssociees = () => {
  const [date, setDate] = useState("");
  const [demiJournee, setDemiJournee] = useState("");
  const [tabletteData, setTabletteData] = useState([]);
  const [filteredTabletteData, setFilteredTabletteData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
    } else {
      // Fetch the initial data with token
      axios.get("http://localhost:8000/api/tablette", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          console.log(response.data);
          setTabletteData(response.data);
          setFilteredTabletteData(response.data);
        })
        .catch(error => {
          console.error('Error fetching tablette data:', error); 
        });
    }
  }, [token]);


  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTabletteData(tabletteData);
    } else {
      const filtered = tabletteData.filter(tablette =>
        tablette.device_id.toLowerCase().includes(query.toLowerCase()) && tablette.statut === 'refuser'
      );
      setFilteredTabletteData(filtered);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Les appareils refusées</h1>
        </div>
        <div></div>
        <div>
          <label className="input bg-gray-300 input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      <table className="table lg:w-[70vw] w-full">
        <thead>
          <tr className="text-slate-700">
            <th>Device ID</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {filteredTabletteData.map((tablette) => {
            if (tablette.statut === 'refuser') {
              return (
                <tr className="cursor-pointer" key={tablette.device_id}>
                  <td>{tablette.device_id}</td>
                  <td>{tablette.statut}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablettesAssociees;
