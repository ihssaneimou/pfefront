import React, { useEffect, useState } from "react";
import axios from "axios";

const Surveillants = () => {
  const [surveillants, setSurveillants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [numBureau, setNumBureau] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/surveillant")
      .then((response) => {
        setSurveillants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching surveillants", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/surveillant/create",
        {
          nomComplet_s: `${nom} ${prenom}`,
          numBureau, // Assuming you add numBureau in your backend model and controller
        }
      );
      setSurveillants([...surveillants, response.data]);
      alert("Surveillant ajouté avec succès!");
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.error("Erreur lors de l'ajout du surveillant", error);
      alert("Erreur lors de l'ajout du surveillant");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/surveillant/${id}`);
      setSurveillants(surveillants.filter((s) => s.id !== id));
      alert("Surveillant supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression du surveillant", error);
      alert("Erreur lors de la suppression du surveillant");
    }
  };
  return (
    <div className="overflow-x-auto">
      <div className="w-full flex mb-4">
        <select className="mx-auto select select-bordered bg-gray-300 w-full max-w-xs">
          <option disabled selected>
            Selectionner le nom du departement
          </option>
          <option>Info</option>
          <option>Math</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Liste des surveillants</h1>
        </div>
        <div>
          <label className="input input-bordered flex bg-gray-300 items-center gap-2">
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
            Ajouter Surveillant
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-gray-200">
              <h3 className="font-bold text-lg mb-4">Ajouter un surveillant</h3>
              <form onSubmit={handleSubmit}>
                {" "}
                {/* Assuming you have defined handleSubmit */}
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
                <label className="input bg-gray-300 input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Num bureau"
                    value={numBureau}
                    onChange={(e) => setNumBureau(e.target.value)}
                  />
                </label>
                <div className="modal-action grid grid-cols-3 gap-4 items-center">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Confirmer
                  </button>
                  <div></div>
                  <button
                    type="button"
                    className="btn float-right text-white bg-red-400 border-none hover:bg-red-500"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
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
            <th>Num bureau</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {surveillants.map((surveillant) => (
            <tr className="hover cursor-pointer" key={surveillant.id}>
              <td>{surveillant.nom}</td>
              <td>{surveillant.prenom}</td>
              <td>{surveillant.numBureau}</td>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => handleDelete(surveillant.id)}
                >
                  {/* Delete Icon */}
                </button>
                <button className="btn btn-ghost btn-xs">
                  {/* Edit Icon */}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <label htmlFor="date">Date Expiration:</label>
              <input type="date" />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Surveillants;
