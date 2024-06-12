import React, { useState, useEffect } from "react";
import { useToken } from "../App";

const Pvs = () => {
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [demiJournee, setDemiJournee] = useState("");
  const [showTabs, setShowTabs] = useState(false);
  const { token, setToken } = useToken();

  useEffect(() => {
    
    if (!token) {
      alert("No token found. Please log in.");
   
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!token) {
      alert("No token found. Please log in.");
   
      return;
    }
    console.log("Form submitted:", { date, local, demiJournee });
    setShowTabs(true);
  };
  const displayTabs = () => {
    return (
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Etudiants Présents"
          checked
        />
        <div
          role="tabpanel"
          className="tab-content bg-slate-200 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <div>
                <h1 className="text-xl text-center mb-4 mr-10">
                  Etudiants Présents
                </h1>
              </div>

              <div className="flex flex-row">
                <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
                  <div className="card-body">
                    <p>Module :</p>
                    <p>Demi jourée :</p>
                    <p>Local :</p>
                  </div>
                </div>
                <div className="w-full max-w-xs">
                  <select
                    className="mx-auto bg-gray-300 select select-bordered w-full"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                  >
                    <option disabled value="">
                      Seance{" "}
                    </option>
                    <option>Seance 1</option>
                    <option>Seance 2</option>
                  </select>
                </div>
              </div>

              <div className="flex">
                <label className="m-auto bg-gray-300 input w-1/4 input-bordered flex items-center gap-2">
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
            <table className="table m-auto w-4/5">
              {/* head */}
              <thead>
                <tr className="text-slate-700">
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Code apogee</th>
                  <th>CNE</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className=" cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                </tr>
                <tr className=" cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                </tr>
                <tr className=" cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Etudiants Absents"
        />
        <div
          role="tabpanel"
          className="tab-content bg-slate-200 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <div>
                <h1 className="text-xl text-center mb-4 mr-10">
                  Etudiants Absents
                </h1>
              </div>
              <div className="flex flex-row">
                <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
                  <div className="card-body">
                    <p>Module :</p>
                    <p>Demi jourée :</p>
                    <p>Local :</p>
                  </div>
                </div>
                <div className="w-full max-w-xs">
                  <select
                    className="mx-auto bg-gray-300 select select-bordered w-full"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                  >
                    <option disabled value="">
                      Seance{" "}
                    </option>
                    <option>Seance 1</option>
                    <option>Seance 2</option>
                  </select>
                </div>
              </div>
              <div className="flex">
                <label className="m-auto bg-gray-300 input w-1/4 input-bordered flex items-center gap-2">
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
            <table className="table m-auto w-4/5">
              {/* head */}
              <thead>
                <tr className="text-slate-700">
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Code apogee</th>
                  <th>CNE</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className=" cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                </tr>
                <tr className=" cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                </tr>
                <tr className=" cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Rapports"
        />
        <div
          role="tabpanel"
          className="tab-content bg-slate-200 border-base-300 rounded-box p-6"
        >
          <div className="flex flex-row">
            <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
              <div className="card-body">
                <p>Module :</p>
                <p>Demi jourée :</p>
                <p>Local :</p>
              </div>
            </div>
            <div className="w-full max-w-xs">
              <select
                className="mx-auto bg-gray-300 select select-bordered w-full"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              >
                <option disabled value="">
                  Selectionner le local
                </option>
                <option>Seance 1</option>
                <option>Seance 2</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row flex-wrap	justify-around content-around">
            <div className="content-center">
              <p>Ayoub Hafid-21498179-N14</p>
            </div>
            <div className="card w-96 bg-gray-300 shadow-xl mb-4 ">
              <div className="card-body">
                <p> </p>
                <p> </p>
                <p> </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-wrap	justify-around content-around">
            <div className="content-center">
              <p>XXXXXXXX</p>
            </div>
            <div className="card w-96 bg-gray-300 shadow-xl mb-4 ">
              <div className="card-body">
                <p> </p>
                <p> </p>
                <p> </p>
              </div>
            </div>
          </div>
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Surveillants"
        />
        <div
          role="tabpanel"
          className="tab-content bg-slate-200 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <div>
                <h1 className="text-xl text-center mb-4 mr-10">Surveillants</h1>
              </div>
              <div className="flex flex-row">
                <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
                  <div className="card-body">
                    <p>Module :</p>
                    <p>Demi jourée :</p>
                    <p>Local :</p>
                  </div>
                </div>
                <div className="w-full max-w-xs">
                  <select
                    className="mx-auto bg-gray-300 select select-bordered w-full"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                  >
                    <option disabled value="">
                      Seance{" "}
                    </option>
                    <option>Seance 1</option>
                    <option>Seance 2</option>
                  </select>
                </div>
              </div>
              <div className="flex">
                <label className="m-auto bg-gray-300 input w-1/4 input-bordered flex items-center gap-2">
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
            <table className="table m-auto w-4/5">
              {/* head */}
              <thead>
                <tr className="text-slate-700">
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Num</th>
                  <th>Signature</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td></td>
                </tr>
                <tr className="hover cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td></td>
                </tr>
                <tr className="hover cursor-pointer">
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <form className="overflow-x-auto mb-4" onSubmit={handleSubmit}>
        <div className="w-full mb-4">
          <label
            htmlFor="dateInput"
            className="block text-sm font-medium text-white-700"
          >
            Selectionner la date de l'examen
          </label>
          <br />
          <input
            id="dateInput"
            type="date"
            className="mx-auto border bg-gray-300 rounded-md p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="w-full flex mb-4">
          <select
            className="mx-auto select bg-gray-300 select-bordered w-full max-w-xs"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          >
            <option disabled value="">
              Selectionner le local
            </option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
        <div className="w-full flex mb-4">
          <select
            className="mx-auto select select-bordered bg-gray-300 w-full max-w-xs"
            value={demiJournee}
            onChange={(e) => setDemiJournee(e.target.value)}
          >
            <option disabled value="">
              Selectionner la demi-journée
            </option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center px-3 py-2 bg-green-200 rounded-md text-green-700"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="ml-1">Rechercher</span>
        </button>
      </form>
      {showTabs && displayTabs()}
    </>
  );
};

export default Pvs;
