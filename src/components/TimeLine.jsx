import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TimeLine.css'; // Ensure the path is correct

const TimeLine = () => {
  const [actions, setActions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:8000/api/logs')
      .then(response => {
        const sortedActions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setActions(sortedActions);
        console.log(sortedActions);
      })
      .catch(error => {
        console.error('Error fetching actions:', error);
      });
  }, []);

  const totalPages = Math.ceil(actions.length / itemsPerPage);
  const currentActions = actions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

    return (
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`pagination-button ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    );
  };

  return (
    <div className="timeline-container">
      <h1 className="timeline-heading">Chronologie des Activités</h1>
      <ul className="space-y-3 w-full">
        {currentActions.map((action, index) => (
          <li key={index} className="timeline-item w-full">
            <p className="timeline-text w-full">{action.description}</p>
          </li>
        ))}
      </ul>
      {renderPagination()}
    </div>
  );
};

export default TimeLine;
