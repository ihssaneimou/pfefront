import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios
import { useToken } from "../App";

// CSS Styles
const styles = `
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f0f2f5;
}

.session-container {
    width: 90%;
    padding: 2rem;
    background-color: #ffffff;
    margin: 2rem auto;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.session-heading {
    font-size: 2rem;
    color: #154296;
    margin-bottom: 1rem;
    text-align: center;
    border-bottom: 2px solid #154296;
    padding-bottom: 1rem;
}

.input, .select, .button {
    padding: 0.5rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    margin-bottom: 1rem;
}

.input {
    border: 2px solid #3182ce;
    background-color: #f7fafc;
    width: 100%;
}

.input:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 2px rgba(99, 179, 237, 0.3);
    outline: none;
}

.select {
    border: 2px solid #3182ce;
    background-color: #f7fafc;
    cursor: pointer;
    width: 100%;
}

.select:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 2px rgba(99, 179, 237, 0.3);
    outline: none;
}

.button {
    background-color: #3182ce;
    color: white;
    padding: 0.75rem 1rem;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s;
    width: 100%;
}

.button:hover {
    background-color: #63b3ed;
}

.table-responsive {
    width: 100%;
    overflow-x: auto;
    margin-top: 1rem;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

.table th, .table td {
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    font-size: 0.875rem;
}

.table th {
    background-color: #154296;
    color: white;
}

.table tbody tr:hover {
    background-color: #f1f1f1;
}

.modal.active {
    display: block;
}

.modal-box {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-action .button {
    margin-top: 1rem;
    background-color: #154296;
    width: auto;
}

.modal-action .button:hover {
    background-color: #1e5aaa;
}

.modal-action .button.bg-red-500:hover {
    background-color: #d9534f;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.pagination button {
    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.pagination button:hover {
    background-color: #f0f0f0;
}

.pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.pagination .bg-blue-600 {
    background-color: #3182ce;
    color: white;
}

.pagination .bg-blue-600:hover {
    background-color: #63b3ed;
}
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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

  return (
    <div className="flex justify-center mt-4 mb-4">
      <button
        className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="mx-1 px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`mx-1 px-2 py-1 rounded ${
              currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

const Repartitions = () => {
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [demiJournee, setDemiJournee] = useState("");
  const [showTabs, setShowTabs] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [surveillants, setSurveillants] = useState([]);
  const [filteredSurveillants, setFilteredSurveillants] = useState([]);
  const [locals, setLocals] = useState([]);
  const { token } = useToken();
  const [activeTab, setActiveTab] = useState('Repartition etudiant');
  const [currentPageStudents, setCurrentPageStudents] = useState(1);
  const [currentPageSurveillants, setCurrentPageSurveillants] = useState(1);
  const itemsPerPage = 10;
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [surveillantSearchQuery, setSurveillantSearchQuery] = useState("");

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
    
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
      const studentResponse = await axios.post(
        "http://127.0.0.1:8000/api/etudiants-examen",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Array.isArray(studentResponse.data.data) ? setStudents(studentResponse.data.data) : setStudents([]);
      setFilteredStudents(studentResponse.data.data || []);
      setCurrentPageStudents(1);

      const surveillantResponse = await axios.post(
        "http://127.0.0.1:8000/api/surveillants-examen",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Array.isArray(surveillantResponse.data.data) ? setSurveillants(surveillantResponse.data.data) : setSurveillants([]);
      setFilteredSurveillants(surveillantResponse.data.data || []);
      setCurrentPageSurveillants(1);

      setShowTabs(true);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleStudentSearch = (query) => {
    setStudentSearchQuery(query);
    if (!query) {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.nom_etudiant.toLowerCase().includes(query.toLowerCase()) ||
          student.prenom_etudiant.toLowerCase().includes(query.toLowerCase()) ||
          student.CNE.toLowerCase().includes(query.toLowerCase()) ||
          student.codeApogee.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleSurveillantSearch = (query) => {
    setSurveillantSearchQuery(query);
    if (!query) {
      setFilteredSurveillants(surveillants);
    } else {
      const filtered = surveillants.filter(
        (surveillant) =>
          surveillant.nomComplet_s.toLowerCase().includes(query.toLowerCase()) ||
          surveillant.id_departement.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSurveillants(filtered);
    }
  };

  const totalPagesStudents = Math.ceil(filteredStudents.length / itemsPerPage);
  const totalPagesSurveillants = Math.ceil(filteredSurveillants.length / itemsPerPage);

  const currentStudents = filteredStudents.slice(
    (currentPageStudents - 1) * itemsPerPage,
    currentPageStudents * itemsPerPage
  );

  const currentSurveillants = filteredSurveillants.slice(
    (currentPageSurveillants - 1) * itemsPerPage,
    currentPageSurveillants * itemsPerPage
  );

  const displayTabs = () => {
    return (
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Repartition etudiant"
          checked={activeTab === 'Repartition etudiant'}
          onChange={() => setActiveTab('Repartition etudiant')}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${
            activeTab === "Repartition etudiant" ? "" : "hidden"
          }`}
        >
          <div className="overflow-x-auto">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <h1 className="text-xl mb-4 mr-10">Repartition etudiant</h1>
              </div>
              <div></div>
              <div>
                <label className="input bg-gray-300 input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={studentSearchQuery}
                    onChange={(e) => handleStudentSearch(e.target.value)}
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
            </div>
            <table className="table m-auto w-full">
              <thead className="bg-gray-200">
                <tr className="text-slate-700">
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>CNE</th>
                  <th>Code apogee</th>
                  <th>Numero d'exam</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.codeApogee} className="cursor-pointer hover:bg-gray-100">
                    <td>{student.nom_etudiant}</td>
                    <td>{student.prenom_etudiant}</td>
                    <td>{student.CNE}</td>
                    <td>{student.codeApogee}</td>
                    <td>{student.num_exam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPageStudents}
              totalPages={totalPagesStudents}
              onPageChange={setCurrentPageStudents}
            />
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Repartition surveillant"
          checked={activeTab === 'Repartition surveillant'}
          onChange={() => setActiveTab('Repartition surveillant')}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-slate-200 border-base-300 rounded-box p-6 ${
            activeTab === "Repartition surveillant" ? "" : "hidden"
          }`}
        >
          <div className="overflow-x-auto">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <h1 className="text-xl mb-4 mr-10">Repartition surveillant</h1>
              </div>
              <div></div>
              <div>
                <label className="input input-bordered bg-gray-300 flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={surveillantSearchQuery}
                    onChange={(e) => handleSurveillantSearch(e.target.value)}
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
            </div>
            <table className="table lg:w-[70vw] w-full">
              <thead className="bg-gray-200">
                <tr className="text-slate-700">
                  <th>Nom Complet</th>
                  <th>ID departement</th>
                </tr>
              </thead>
              <tbody>
                {currentSurveillants.map((surveillant) => (
                  <tr key={surveillant.id_surveillant} className="hover:bg-gray-100 cursor-pointer">
                    <td>{surveillant.nomComplet_s}</td>
                    <td>{surveillant.id_departement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPageSurveillants}
              totalPages={totalPagesSurveillants}
              onPageChange={setCurrentPageSurveillants}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="session-container">
      <style>{styles}</style>
      <form className="w-1/2  mx-auto overflow-x-auto mb-4 p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="dateInput"
            className="block text-sm font-medium text-gray-700"
          >
            Selectionner la date de l'examen
          </label>
          <input
            id="dateInput"
            type="date"
            className="border bg-gray-100 rounded-md p-2 mt-1 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <select
            className="select select-bordered bg-gray-100 w-full mt-1"
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
        <div className="mb-4">
          <select
            className="select select-bordered bg-gray-100 w-full mt-1"
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
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <svg
            className="w-6 h-6"
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
          <span className="ml-2">Rechercher</span>
        </button>
      </form>
      {showTabs && displayTabs()}
    </div>
  );
};

export default Repartitions;
