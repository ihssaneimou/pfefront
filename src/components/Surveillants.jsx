import React, { useEffect, useState } from "react";
import axios from "axios";

const Surveillants = () => {
  const [surveillants, setSurveillants] = useState([]);
  const [nomComplet, setNomComplet] = useState("");
  const [idDepartement, setIdDepartement] = useState("");
  const [currentId, setCurrentId] = useState(null);

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

  const handleAdd = async (e) => {
    e.preventDefault();
    const newSurveillant = {
      nomComplet_s: nomComplet,
      id_departement: idDepartement,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/surveillant/create", newSurveillant);
      setSurveillants([...surveillants, response.data]);
      alert("Surveillant ajouté avec succès!");
      document.getElementById("my_modal_1").close();
      // Reset form fields
      setNomComplet("");
      setIdDepartement("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du surveillant", error);
      alert("Erreur lors de l'ajout du surveillant");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/surveillant/${id}`);
      setSurveillants(surveillants.filter(s => s.id !== id));
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
          <button
            className="btn mx-auto w-[60%] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Ajouter Surveillant
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-gray-200">
              <h3 className="font-bold text-lg mb-4">Ajouter un surveillant</h3>
              <form onSubmit={handleAdd}>
                <label className="input bg-gray-300 input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Nom Complet"
                    value={nomComplet}
                    onChange={(e) => setNomComplet(e.target.value)}
                  />
                </label>
                <label className="input bg-gray-300 input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="ID departement"
                    value={idDepartement}
                    onChange={(e) => setIdDepartement(e.target.value)}
                  />
                </label>
                <div className="modal-action grid grid-cols-3 gap-4 items-center">
                  <button
                    type="submit"
                    className="w-full p-3 rounded-md bg-blue-600 text-black hover:bg-blue-700 focus:outline-none"
                  >
                    Confirmer
                  </button>
                  <div></div>
                  <button
                    type="button"
                    className="btn float-right text-black bg-red-400 border-none hover:bg-red-500"
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
            <th>Nom Complet</th>
            <th>ID departement</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {surveillants.map((surveillant) => (
            <tr className="hover cursor-pointer" key={surveillant.id_surveillant}>
              <td>{surveillant.nomComplet_s}</td>
              <td>{surveillant.id_departement}</td>
              <th>
              <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => handleDelete(surveillant.id_surveillant)}
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
