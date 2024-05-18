import React from "react";

const HistoriqueSessions = () => {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Historique des sessions</h1>
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
            Créer session
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-gray-200">
              <h3 className="font-bold text-lg mb-4">Créer une session</h3>
              <select className="select bg-gray-300 select-bordered w-full max-w-xs mb-4">
                <option disabled selected>
                  Nom session
                </option>
                <option>Automne-hiver</option>
                <option>Printemps-été</option>
              </select>
              <select className="select bg-gray-300 select-bordered w-full max-w-xs">
                <option disabled selected>
                  Type session
                </option>
                <option>Normale</option>
                <option>Rattrapage</option>
              </select>
              <div className="modal-action grid grid-cols-3 gap-4 items-center">
                <button className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
                  Confirmer
                </button>
                <div></div>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn float-right text-white bg-red-400 border-none hover:bg-red-500">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <table className="table lg:w-[70vw] w-full">
        {/* head */}
        <thead>
          <tr className="text-slate-700">
            <th>Nom session</th>
            <th>Type session</th>
            <th>Date debut</th>
            <th>Date fin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className=" cursor-pointer">
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>
              <button className="btn btn-ghost btn-xs">Consulter</button>
            </td>
          </tr>
          <tr className=" cursor-pointer">
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>
              <button className="btn btn-ghost btn-xs">Consulter</button>
            </td>
          </tr>
          <tr className=" cursor-pointer">
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>XXXXXX</td>
            <td>
              <button className="btn btn-ghost btn-xs">Consulter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueSessions;
