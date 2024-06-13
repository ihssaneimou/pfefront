import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Activity Timeline</h1>
      <ul>
        {actions.map((action, index) => (
          <li key={index}>{action.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLine;
