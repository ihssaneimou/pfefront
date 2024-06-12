import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useToken } from "../App";

const TablettesAssociees = () => {
  const [date, setDate] = useState("");
  const [tablette, setTablette] = useState("");
  const [demiJournee, setDemiJournee] = useState("");
  const [tabletteData, setTabletteData] = useState([]);
  const { token, setToken } = useToken();

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
        })
        .catch(error => {
          console.error('Error fetching tablette data:', error); 
        });
    }
  }, []);

  const handleDelete = async (device_id) => {
    
    try {
      await axios.delete(`http://localhost:8000/api/affectation/delete/${device_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTabletteData(tabletteData.filter(tablette => tablette.device_id !== device_id));
      alert('La tablette a été dissociée avec succès !');
    } catch (error) {
      console.error('Une erreur est produite lors de la suppression de la tablette :', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!token) {
      alert("No token found. Please log in.");
      
      return;
    }
    console.log("Form submitted:", { date, tablette, demiJournee });
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Les appareils dissociees</h1>
        </div>
        <div></div>
        <div>
          <label className="input bg-gray-300 input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
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
            <th>Code Association</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tabletteData.map((tablette) =>{if(tablette.statut=='bloquer') {return(
            <tr className="cursor-pointer" key={tablette.device_id}>
              <td>{tablette.device_id}</td>
              <td>{tablette.statut}</td>
              <td>{tablette.code_association}</td>
              <td className="flex gap-4">
                <button
                  className="btn p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                  onClick={() => handleDelete(tablette.device_id)}
                >
                  Reassocier
                </button>
              </td>
            </tr>
          )}})}
        </tbody>
      </table>
    </div>
  );
};

export default TablettesAssociees;
