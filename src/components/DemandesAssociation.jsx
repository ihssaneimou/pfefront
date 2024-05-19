import React, { useState } from "react";

const DemandesAssociation = () => {
  const [demandesAcceptees, setDemandesAcceptees] = useState([]);

  const accepterDemande = (Num) => {
    console.log("Demande acceptée  :", Num);
  };

  const refuserDemande = (Num) => {
    console.log("Demande refusée :", Num);
  };

  const ajouterDemandeAcceptee = (demandeAcceptee) => {
    setDemandesAcceptees([...demandesAcceptees, demandeAcceptee]);
  };



  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Les demandes associations</h1>
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
        {/* head */}
        <thead>
          <tr className="text-slate-700">
            <th>Num</th>
            <th>Adresse MAC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Remplacez les données factices par vos propres données */}
          {demandesAcceptees.map((demande, index) => (
            <tr key={index}>
              <td>{demande.Num}</td>
              <td>{demande.adresseMAC}</td>
              <td>
                <button
                  className="p-3 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none"
                  onClick={() => refuserDemande(demande.Num)}
                >
                  Refuser
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemandesAssociation;