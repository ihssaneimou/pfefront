import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios
import { useToken } from "../App";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfPageToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= halfPageToShow) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > totalPages - halfPageToShow) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - halfPageToShow; i <= currentPage + halfPageToShow; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <span key={index} className="mx-1 px-2 py-1 text-sm">
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`mx-1 px-2 py-1 rounded text-sm ${
            currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="flex justify-center mt-4 mb-4">
      <button
        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      {renderPagination()}
      <button
        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

const Pvs = () => {
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [locals, setLocals] = useState([]); // New state for storing locals
  const [demiJournee, setDemiJournee] = useState("");
  const [seance, setSeance] = useState("S1");
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState("etudiantsPresents"); // New state for active tab
  const [etudiantsPS1, setEtudiantsPS1] = useState([]);
  const [etudiantsAS1, setEtudiantsAS1] = useState([]);
  const [etudiantsPS2, setEtudiantsPS2] = useState([]);
  const [etudiantsAS2, setEtudiantsAS2] = useState([]);
  const [surveillants, setSurveillants] = useState([]);
  //const [module, setModule] = useState("");
  const [module1, setModule1] = useState("");
  const [module2, setModule2] = useState("");
  const [rapport, setRapport] = useState([]);
  const { token, setToken } = useToken();

  const itemsPerPage = 7; // Items per page for pagination

  // Pagination states for each section
  const [currentPagePS1, setCurrentPagePS1] = useState(1);
  const [currentPageAS1, setCurrentPageAS1] = useState(1);
  const [currentPagePS2, setCurrentPagePS2] = useState(1);
  const [currentPageAS2, setCurrentPageAS2] = useState(1);
  const [currentPageRapport, setCurrentPageRapport] = useState(1);
  const [currentPageSurveillants, setCurrentPageSurveillants] = useState(1);

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
      console.log(response.data);
      setEtudiantsPS1(response.data.etudiantsPS1 || []);
      setEtudiantsAS1(response.data.etudiantsAS1 || []);
      setEtudiantsPS2(response.data.etudiantsPS2 || []);
      setEtudiantsAS2(response.data.etudiantsAS2 || []);
      setSurveillants(response.data.surveillants || []);
      setRapport(response.data.rapport || []);
      //setModule(response.data.module || "");
      setModule1(response.data.module1 || "");
      setModule2(response.data.module2 || "");
      setShowTabs(true);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const displayTabs = () => {
    const totalPagesPS1 = Math.ceil(etudiantsPS1.length / itemsPerPage);
    const totalPagesAS1 = Math.ceil(etudiantsAS1.length / itemsPerPage);
    const totalPagesPS2 = Math.ceil(etudiantsPS2.length / itemsPerPage);
    const totalPagesAS2 = Math.ceil(etudiantsAS2.length / itemsPerPage);
    const totalPagesRapport = Math.ceil(rapport.length / itemsPerPage);
    const totalPagesSurveillants = Math.ceil(surveillants.length / itemsPerPage);

    const currentEtudiantsPS1 = etudiantsPS1.slice(
      (currentPagePS1 - 1) * itemsPerPage,
      currentPagePS1 * itemsPerPage
    );
    const currentEtudiantsAS1 = etudiantsAS1.slice(
      (currentPageAS1 - 1) * itemsPerPage,
      currentPageAS1 * itemsPerPage
    );
    const currentEtudiantsPS2 = etudiantsPS2.slice(
      (currentPagePS2 - 1) * itemsPerPage,
      currentPagePS2 * itemsPerPage
    );
    const currentEtudiantsAS2 = etudiantsAS2.slice(
      (currentPageAS2 - 1) * itemsPerPage,
      currentPageAS2 * itemsPerPage
    );
    const currentRapport = rapport.slice(
      (currentPageRapport - 1) * itemsPerPage,
      currentPageRapport * itemsPerPage
    );
    const currentSurveillants = surveillants.slice(
      (currentPageSurveillants - 1) * itemsPerPage,
      currentPageSurveillants * itemsPerPage
    );

    return (
      <div role="tablist" className="tabs tabs-lifted overflow-auto">
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
          className="tab-content bg-slate-200 border-base-300 rounded-box p-6"
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <h1 className="text-xl text-center mb-4">Etudiants Présents</h1>
              <div className="flex flex-row">
                <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
                  <div className="card-body">
                    <p>Module : {seance === "S1" ? module1 : module2}</p>
                    <p>Demi jourée :{demiJournee}</p>
                    <p>Local :{local}</p>
                  </div>
                </div>
                <div className="w-full max-w-xs">
                  <select
                    className="mx-auto bg-gray-300 select select-bordered w-full"
                    value={seance}
                    onChange={(e) => setSeance(e.target.value)}
                  >
                    <option value="S1">Seance 1</option>
                    <option value="S2">Seance 2</option>
                  </select>
                </div>
              </div>
            
            </div>
            <table className="table m-auto w-full">
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
                  currentEtudiantsPS1.map((etudiant) => (
                    <tr key={etudiant.codeApogee} className="cursor-pointer">
                      <td>{etudiant.nom_etudiant}</td>
                      <td>{etudiant.prenom_etudiant}</td>
                      <td>{etudiant.codeApogee}</td>
                      <td>{etudiant.CNE}</td>
                    </tr>
                  ))}
                {seance === "S2" &&
                  currentEtudiantsPS2.map((etudiant) => (
                    <tr key={etudiant.codeApogee} className="cursor-pointer">
                      <td>{etudiant.nom_etudiant}</td>
                      <td>{etudiant.prenom_etudiant}</td>
                      <td>{etudiant.codeApogee}</td>
                      <td>{etudiant.CNE}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              currentPage={seance === "S1" ? currentPagePS1 : currentPagePS2}
              totalPages={seance === "S1" ? totalPagesPS1 : totalPagesPS2}
              onPageChange={(page) =>
                seance === "S1" ? setCurrentPagePS1(page) : setCurrentPagePS2(page)
              }
            />
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
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${
            activeTab === "etudiantsAbsents" ? "" : "hidden"
          }`}
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <h1 className="text-xl text-center mb-4">Etudiants Absents</h1>
              <div className="flex flex-row">
                <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
                  <div className="card-body">
                  <p>Module : {seance === "S1" ? module1 : module2}</p>
                    <p>Demi jourée :{demiJournee}</p>
                    <p>Local :{local}</p>
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
                  currentEtudiantsAS1.map((etudiant) => (
                    <tr key={etudiant.codeApogee} className="cursor-pointer">
                      <td>{etudiant.nom_etudiant}</td>
                      <td>{etudiant.prenom_etudiant}</td>
                      <td>{etudiant.codeApogee}</td>
                      <td>{etudiant.CNE}</td>
                    </tr>
                  ))}
                {seance === "S2" &&
                  currentEtudiantsAS2.map((etudiant) => (
                    <tr key={etudiant.codeApogee} className="cursor-pointer">
                      <td>{etudiant.nom_etudiant}</td>
                      <td>{etudiant.prenom_etudiant}</td>
                      <td>{etudiant.codeApogee}</td>
                      <td>{etudiant.CNE}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              currentPage={seance === "S1" ? currentPageAS1 : currentPageAS2}
              totalPages={seance === "S1" ? totalPagesAS1 : totalPagesAS2}
              onPageChange={(page) =>
                seance === "S1" ? setCurrentPageAS1(page) : setCurrentPageAS2(page)
              }
            />
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
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${
            activeTab === "rapports" ? "" : "hidden"
          }`}
        >
          <div className="flex flex-row">
            <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
              <div className="card-body">
                    <p>Demi jourée :{demiJournee}</p>
                    <p>Local :{local}</p>
              </div>
            </div>
          
          </div>
          <div className="flex flex-row flex-wrap justify-around content-around">
            {currentRapport.map((rapport, index) => (
            <div key={index} className="content-center">
               <p className="font-bold">{rapport.nom_etudiant} {rapport.prenom_etudiant} {rapport.codeApogee}</p>
                <p className="font-semibold">{rapport.titre_rapport}</p>
               <p>{rapport.contenu}</p>    
            </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPageRapport}
            totalPages={totalPagesRapport}
            onPageChange={(page) => setCurrentPageRapport(page)}
          />
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
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${
            activeTab === "surveillants" ? "" : "hidden"
          }`}
        >
          <div className="overflow-x-auto">
            <div className="items-center">
              <h1 className="text-xl text-center mb-4">Surveillants</h1>
              <div className="flex flex-row">
                <div className="card w-96 bg-slate-100 shadow-xl mb-4 mr-40">
                  <div className="card-body">
              
                    <p>Demi jourée :{demiJournee}</p>
                    <p>Local :{local}</p>
                  </div>
                </div>
              </div>
              <div className="flex">
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
                {currentSurveillants.map((surveillant) => (
                  <tr key={surveillant.id_surveillant} className=" cursor-pointer">
                    <td>{surveillant.nomComplet_s}</td>
                    <td>{surveillant.id_departement}</td>
                    <td>{surveillant.num}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPageSurveillants}
              totalPages={totalPagesSurveillants}
              onPageChange={(page) => setCurrentPageSurveillants(page)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-auto flex-1  flex-col items-center">
      <form className="overflow-x-auto grid justify-center mb-4" onSubmit={handleSubmit}>
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
              if (loc.num_local != 0)
                return (
                  <option key={loc.id_local} value={loc.id_local}>
                    {loc.num_local}
                  </option>
                );
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
    </div>
  );
};

export default Pvs;
