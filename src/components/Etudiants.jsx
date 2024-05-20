import React, { useEffect, useState } from "react";
import axios from "axios";

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [filteredEtudiants, setFilteredEtudiants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [codeApogee, setCodeApogee] = useState("");
  const [CNE, setCNE] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/etudiant")
      .then((response) => {
        setEtudiants(response.data);
        setFilteredEtudiants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the etudiants", error);
      });
  }, []);

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
          photo: "default-url",
        }
      );
      alert("Étudiant ajouté avec succès!");
      setEtudiants([...etudiants, response.data]); // Update etudiants state with the new student
      setFilteredEtudiants([...etudiants, response.data]);
      setModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Erreur lors de l’ajout de l’étudiant", error);
      alert("Erreur lors de l’ajout de l’étudiant");
    }
  };

  const handleDelete = async (codeApogee) => {
    try {
      await axios.delete(`http://localhost:8000/api/etudiant/${codeApogee}`);
      const updatedEtudiants = etudiants.filter((etudiant) => etudiant.codeApogee !== codeApogee);
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
    const filtered = etudiants.filter((etudiant) => {
      return (
        etudiant.nom_etudiant.toLowerCase().includes(query.toLowerCase()) ||
        etudiant.prenom_etudiant.toLowerCase().includes(query.toLowerCase()) ||
        etudiant.codeApogee.toLowerCase().includes(query.toLowerCase()) ||
        etudiant.CNE.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredEtudiants(filtered);
  };

  return (
    <div className="overflow-x-auto">
      <div className="w-full flex mb-4">
        <select className="mx-auto select select-bordered w-full max-w-xs bg-gray-300">
          <option disabled selected>
            Selectionner le code module
          </option>
          <option>M01</option>
          <option>M02</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Liste des etudiants</h1>
        </div>
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
        <div className="flex">
          <button
            className="btn mx-auto w-[60%] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            onClick={() => setModalOpen(true)}
          >
            Ajouter Etudiant
          </button>
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                  <label className="input bg-gray-300 input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="CNE"
                      value={CNE}
                      onChange={(e) => setCNE(e.target.value)}
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
                      className="btn float-right text-white bg-red-400 border-none hover:bg-red-500"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                  </svg>
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
