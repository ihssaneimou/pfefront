import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TimeLine.css'; // Assurez-vous que le chemin est correct

const TimeLine = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/logs')
      .then(response => {
        setActions(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching actions:', error);
      });
  }, []);

  return (
    <div className="timeline-container">
      <h1 className="timeline-heading">Chronologie des Activités</h1>
      <ul className="space-y-3 w-full">
        {actions.map((action, index) => (
          <li key={index} className="timeline-item w-full">
            <p className="timeline-text w-full">{action.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLine;
