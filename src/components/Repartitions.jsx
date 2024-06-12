import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios
import { useToken } from "../App";

const Repartitions = () => {
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [demiJournee, setDemiJournee] = useState("");
  const [showTabs, setShowTabs] = useState(false);
  const [students, setStudents] = useState([]); // New state for storing locals
  const [surveillants, setSurveillants] = useState([]); // New state for storing locals
  const [locals, setLocals] = useState([]); // New state for storing locals
  const { token, setToken } = useToken();

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
    
    // Fetch locals data
    const fetchLocals = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/local", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocals(response.data);
      } catch (error) {
        console.error("Error fetching locals", error);
      }
    };

    fetchLocals();
  }, [token]);

  const handleSubmit = async (event) => {
    const data = {
      "date": date,
      "id_local": local,
      "demi_journee": demiJournee
    };

    event.preventDefault();

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      // Fetch students data
      
      const studentResponse = await axios.post(
        "http://127.0.0.1:8000/api/etudiants-examen",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(studentResponse.data.data);  // Check the raw response format
      console.log(Array.isArray(studentResponse.data));  // Verify it's an array
      setStudents(studentResponse.data.data);

      // Fetch surveillants data
      const surveillantResponse = await axios.post(
        "http://127.0.0.1:8000/api/surveillants-examen",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(surveillantResponse.data);
      setSurveillants(surveillantResponse.data.data);

      setShowTabs(true);
    } catch (error) {
      console.error("Error fetching data", error);
    }
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
                  <th>CNE</th>
                  <th>Code apogee</th>
                  <th>Numero d'exam</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {students.map((student) => (
                  <tr key={student.codeApogee} className="cursor-pointer">
                    <td>{student.nom_etudiant}</td>
                    <td>{student.prenom_etudiant}</td>
                    <td>{student.CNE}</td>
                    <td>{student.codeApogee}</td>
                    <td>{student.num_exam}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
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
                  <th>Nom Complet</th>
                  <th>ID departement</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {surveillants.map((surveillant) => (
                  <tr key={surveillant.id_surveillant} className="hover cursor-pointer">
                    <td>{surveillant.nomComplet_s}</td>
                    <td>{surveillant.id_departement}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th></th>
                  <th> </th>
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
            {locals.map((loc) => (
              <option key={loc.id_local} value={loc.id_local}>
                {loc.num_local}
              </option>
            ))}
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
            <option>AM</option>
            <option>PM</option>
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