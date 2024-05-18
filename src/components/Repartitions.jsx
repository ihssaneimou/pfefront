import React, { useState } from "react";

const Repartitions = () => {
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [demiJournee, setDemiJournee] = useState("");
  const [showTabs, setShowTabs] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
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
          aria-label="Repartition etudiant"
          checked
        />
        <div
          role="tabpanel"
          className="tab-content bg-slate-200 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <h1 className="text-xl mb-4 mr-10">Repartition etudiant</h1>
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
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Code apogee</th>
                  <th>Numero d'exam</th>
                  <th>Module</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className=" cursor-pointer">
                  <td>Nisrin</td>
                  <td>ELAKROUD</td>
                  <td>216673937</td>
                  <td>1</td>
                  <td>M01</td>
                </tr>
                <tr className=" cursor-pointer">
                  <td>Nisrin</td>
                  <td>ELAKROUD</td>
                  <td>216673937</td>
                  <td>1</td>
                  <td>M01</td>
                </tr>
                <tr className=" cursor-pointer">
                  <td>Nisrin</td>
                  <td>ELAKROUD</td>
                  <td>216673937</td>
                  <td>1</td>
                  <td>M01</td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
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
            </table>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Repartition surveillant"
        />
        <div
          role="tabpanel"
          className="tab-content bg-slate-200 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <h1 className="text-xl mb-4 mr-10">Repartition surveillant</h1>
              </div>
              <div></div>
              <div>
                <label className="input input-bordered bg-gray-300 flex items-center gap-2">
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
                <tr>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Num d'immatriculation</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover cursor-pointer">
                  <td>XXXXXX</td>
                  <td>XXXXXX</td>
                  <td>XXXXXX</td>
                </tr>
                <tr className="hover cursor-pointer">
                  <td>XXXXXX</td>
                  <td>XXXXXX</td>
                  <td>XXXXXX</td>
                </tr>
                <tr className="hover cursor-pointer">
                  <td>XXXXXX</td>
                  <td>XXXXXX</td>
                  <td>XXXXXX</td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th>
                    <label htmlFor="date">Date Expiration : </label>
                    <input type="date" />
                  </th>
                </tr>
              </tfoot>
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
            className="mx-auto select select-bordered bg-gray-300 w-full max-w-xs"
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

export default Repartitions;
