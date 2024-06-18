import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios
import { useToken } from "../App";

const Pvs = () => {
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [locals, setLocals] = useState([]); // New state for storing locals
  const [demiJournee, setDemiJournee] = useState("");
  const [seance, setSeance] = useState("");
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState("etudiantsPresents"); // New state for active tab
  const [etudiantsPS1, setEtudiantsPS1] = useState([]);
  const [etudiantsAS1, setEtudiantsAS1] = useState([]);
  const [etudiantsPS2, setEtudiantsPS2] = useState([]);
  const [etudiantsAS2, setEtudiantsAS2] = useState([]);
  const [surveillants, setSurveillants] = useState([]);
  const [rapport, setRapport] = useState([]);
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
    event.preventDefault();

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/pv/getPV",
        { date, id_local: local, demi_journee: demiJournee },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data)
      setEtudiantsPS1(response.data.etudiantsPS1 || []);
      setEtudiantsAS1(response.data.etudiantsAS1 || []);
      setEtudiantsPS2(response.data.etudiantsPS2 || []);
      setEtudiantsAS2(response.data.etudiantsAS2 || []);
      setSurveillants(response.data.surveillants || []);
      setRapport(response.data.rapport || []);
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
          aria-label="Etudiants Présents"
          checked={activeTab === "etudiantsPresents"}
          onChange={() => setActiveTab("etudiantsPresents")}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${activeTab === "etudiantsPresents" ? "" : "hidden"}`}
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <h1 className="text-xl text-center mb-4">Etudiants Présents</h1>
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
                    value={seance}
                    onChange={(e) => setSeance(e.target.value)}
                  >
                    <option disabled value="">
                      Seance
                    </option>
                    <option value="S1">Seance 1</option>
                    <option value="S2">Seance 2</option>
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
              <thead>
                <tr className="text-slate-700">
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Code apogee</th>
                  <th>CNE</th>
                </tr>
              </thead>
              <tbody>
                {seance === "S1" &&
                  etudiantsPS1.map((etudiant) => (
                    <tr key={etudiant.codeApogee} className="cursor-pointer">
                      <td>{etudiant.nom_etudiant}</td>
                      <td>{etudiant.prenom_etudiant}</td>
                      <td>{etudiant.codeApogee}</td>
                      <td>{etudiant.CNE}</td>
                    </tr>
                  ))}
                {seance === "S2" &&
                  etudiantsPS2.map((etudiant) => (
                    <tr key={etudiant.codeApogee} className="cursor-pointer">
                      <td>{etudiant.nom_etudiant}</td>
                      <td>{etudiant.prenom_etudiant}</td>
                      <td>{etudiant.codeApogee}</td>
                      <td>{etudiant.CNE}</td>
                    </tr>
                  ))}
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
          checked={activeTab === "etudiantsAbsents"}
          onChange={() => setActiveTab("etudiantsAbsents")}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${activeTab === "etudiantsAbsents" ? "" : "hidden"}`}
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <h1 className="text-xl text-center mb-4">Etudiants Absents</h1>
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
                    value={seance}
                    onChange={(e) => setSeance(e.target.value)}
                  >
                    <option disabled value="">
                      Seance
                    </option>
                    <option value="S1">Seance 1</option>
                    <option value="S2">Seance 2</option>
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
              <thead>
                <tr className="text-slate-700">
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Code apogee</th>
                  <th>CNE</th>
                </tr>
              </thead>
              <tbody>
                {seance === "S1" &&
                  etudiantsAS1.map((etudiant) => (
                    <tr key={etudiant.codeApogee} className="cursor-pointer">
                      <td>{etudiant.nom_etudiant}</td>
                      <td>{etudiant.prenom_etudiant}</td>
                      <td>{etudiant.codeApogee}</td>
                      <td>{etudiant.CNE}</td>
                    </tr>
                  ))}
                {seance === "S2" &&
                  etudiantsAS2.map((etudiant) => (
                    <tr key={etudiant.codeApogee} className="cursor-pointer">
                      <td>{etudiant.nom_etudiant}</td>
                      <td>{etudiant.prenom_etudiant}</td>
                      <td>{etudiant.codeApogee}</td>
                      <td>{etudiant.CNE}</td>
                    </tr>
                  ))}
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
          checked={activeTab === "rapports"}
          onChange={() => setActiveTab("rapports")}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${activeTab === "rapports" ? "" : "hidden"}`}
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
          <div className="flex flex-row flex-wrap justify-around content-around">
            {rapport.map((rapport, index) => (
              <div key={index} className="content-center">
                <p>{rapport.titre_rapport}</p>
                <p>{rapport.contenu}</p>
                <p>{rapport.nom_etudiant}</p>
              </div>
            ))}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Surveillants"
          checked={activeTab === "surveillants"}
          onChange={() => setActiveTab("surveillants")}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${activeTab === "surveillants" ? "" : "hidden"}`}
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <h1 className="text-xl text-center mb-4">Surveillants</h1>
              <div className="flex flex-row">
                <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
                  <div className="card-body">
                    <p>Module :</p>
                    <p>Demi jourée :</p>
                    <p>Local :</p>
                  </div>
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
              <thead>
                <tr className="text-slate-700">
                  <th>Nom Complet</th>
                  <th>Numero de departement</th>
                  <th>Signature</th>
                </tr>
              </thead>
              <tbody>
                {surveillants.map((surveillant) => (
                  <tr key={surveillant.id_surveillant} className="hover cursor-pointer">
                    <td>{surveillant.nomComplet_s}</td>
                    <td>{surveillant.id_departement}</td>
                    <td>{surveillant.num}</td>
                    <td></td>
                  </tr>
                ))}
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
            className="mx-auto select select-bordered bg-gray-300 w-full max-w-xs"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          >
            <option disabled value="">
              Selectionner le local
            </option>
            {locals.map((loc) => {
              if (loc.num_local != 0) return (
                <option key={loc.id_local} value={loc.id_local}>
                  {loc.num_local}
                </option>
              )
            })}
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

export default Pvs;
