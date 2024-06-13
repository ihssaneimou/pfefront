import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../App";

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [filteredEtudiants, setFilteredEtudiants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [codeApogee, setCodeApogee] = useState("");
  const [CNE, setCNE] = useState("");
  const [photo, setPhoto] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modules, setModules] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    axios
      .get("http://localhost:8000/api/etudiant", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEtudiants(response.data);
        setFilteredEtudiants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the etudiants", error);
      });

    axios
      .get("http://localhost:8000/api/module", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the modules", error);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/etudiant/create",
        {
          nom_etudiant: nom,
          prenom_etudiant: prenom,
          codeApogee: codeApogee,
          CNE: CNE,
          photo: photo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Étudiant ajouté avec succès!");
      const newEtudiant = response.data;
      setEtudiants([...etudiants, newEtudiant]);
      setFilteredEtudiants([...etudiants, newEtudiant]);
      document.getElementById("my_modal_1").close();
      setNom("");
      setPrenom("");
      setCodeApogee("");
      setCNE("");
      setPhoto("");
    } catch (error) {
      console.error("Erreur lors de l’ajout de l’étudiant", error);
      alert("Erreur lors de l’ajout de l’étudiant");
    }
  };

  const handleDelete = async (codeApogee) => {
    try {
      await axios.delete(`http://localhost:8000/api/etudiant/${codeApogee}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedEtudiants = etudiants.filter(
        (etudiant) => etudiant.codeApogee !== codeApogee
      );
      setEtudiants(updatedEtudiants);
      setFilteredEtudiants(updatedEtudiants);
      alert("Étudiant supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant", error);
      alert("Erreur lors de la suppression de l'étudiant");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredEtudiants(etudiants);
    } else {
      const filtered = etudiants.filter(
        (etudiant) =>
          etudiant.nom_etudiant.toLowerCase().includes(query.toLowerCase()) ||
          etudiant.prenom_etudiant
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          etudiant.CNE.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filtered); // Debug: Log the filtered results
      setFilteredEtudiants(filtered);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="w-full flex mb-4 items-center">
      </div>
      <div className="grid grid-cols-3 gap-4 items-center mb-4">
        <div>
          <h1 className="text-xl mb-4">Liste des etudiants</h1>
        </div>
        <div>
          <label className="input input-bordered flex bg-gray-300 items-center gap-2">
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
        <div className="flex justify-end">
          <button
            className="btn mx-auto w-48 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Ajouter Etudiant
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-gray-200">
              <h3 className="font-bold text-lg mb-4">Ajouter un étudiant</h3>
              <form onSubmit={handleSubmit}>
                <label className="input bg-gray-300 input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </label>
                <label className="input bg-gray-300 input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Prénom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </label>
                <label className="input bg-gray-300 input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Code Apogee"
                    value={codeApogee}
                    onChange={(e) => setCodeApogee(e.target.value)}
                  />
                </label>
                <label className="input bg-gray-300 input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    className="grow"
                    placeholder="CNE"
                    value={CNE}
                    onChange={(e) => setCNE(e.target.value)}
                  />
                </label>
                <label className="input bg-gray-300 input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Photo URL"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </label>
                <div className="modal-action grid grid-cols-3 gap-4 items-center">
                  <button
                    type="submit"
                    className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Confirmer
                  </button>
                  <div></div>
                  <button
                    type="button"
                    className="btn text-white bg-red-400 border-none hover:bg-red-500"
                    onClick={() => document.getElementById("my_modal_1").close()}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      <table className="table lg:w-[70vw] w-full">
        <thead>
          <tr className="text-slate-700">
            <th>Nom</th>
            <th>Prenom</th>
            <th>Code apogee</th>
            <th>CNE</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEtudiants.map((etudiant) => (
            <tr className="cursor-pointer" key={etudiant.codeApogee}>
              <td>{etudiant.nom_etudiant}</td>
              <td>{etudiant.prenom_etudiant}</td>
              <td>{etudiant.codeApogee}</td>
              <td>{etudiant.CNE}</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={etudiant.photo} alt="Etudiant Avatar" />
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => handleDelete(etudiant.codeApogee)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Etudiants;
