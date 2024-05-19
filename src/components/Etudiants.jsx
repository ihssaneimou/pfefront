import React, { useEffect, useState } from "react";
import axios from "axios";

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [codeApogee, setCodeApogee] = useState("");
  const [CNE, setCNE] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/etudiant") // Adjust the URL based on your API address
      .then((response) => {
        setEtudiants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the etudiants", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nom':
        setNom(value);
        break;
      case 'prenom':
        setPrenom(value);
        break;
      case 'codeApogee':
        setCodeApogee(value);
        break;
      case 'CNE':
        setCNE(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/etudiant/create",
        {
          nom_etudiant: nom,
          prenom_etudiant: prenom,
          codeApogee:  codeApogee, // Adjust field names based on your actual database schema
          CNE: CNE,
          photo: "default-url", // Provide a default or a way to upload an image
        }
      );
      alert("Étudiant ajouté avec succès!");
      console.log(response.data);
      document.getElementById("my_modal_1").close(); // Close the modal on success
    } catch (error) {
      console.error("Erreur lors de l’ajout de l’étudiant", error);
      alert("Erreur lors de l’ajout de l’étudiant");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/etudiant/${id}`);
      setEtudiants(etudiants.filter((etudiant) => etudiant.id !== id));
      alert("Étudiant supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant", error);
      alert("Erreur lors de la suppression de l'étudiant");
    }
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
        <div className="flex">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn mx-auto w-[60%] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Ajouter Etudiant
          </button>
          <dialog id="my_modal_1" className="modal">
            <form onSubmit={handleSubmit} className="modal-box bg-gray-200">
              <h3 className="font-bold text-lg mb-4">Ajouter un étudiant</h3>
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
                  onClick={handleSubmit}
                >
                  Confirmer
                </button>
                
                <div></div>
                <button
                  type="button"
                  className="btn float-right text-white bg-red-400 border-none hover:bg-red-500"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  Close
                </button>
              </div>
            </form>
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
          {etudiants.map((etudiant) => (
            <tr className="cursor-pointer" key={etudiant.id}>
              <td>{etudiant.nom_etudiant}</td>
              <td>{etudiant.prenom_etudiant}</td>
              <td>{etudiant.nom_etudiant}</td>
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
                  onClick={() => handleDelete(etudiant.id)}
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

                <button className="btn btn-ghost btn-xs"
                onClick={() => handleChange(etudiant.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                  
                </button>
                
              </td>
            </tr>
          ))}
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <label htmlFor="date">Date Expiration : </label>
                <input type="date" />
              </th>
            </tr>
          </tfoot>
        </tbody>
      </table>
    </div>
  );
};

export default Etudiants;
