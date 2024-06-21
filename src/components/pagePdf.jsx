import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../App';

function PagePdf() {
  const { id } = useParams(); // Retrieve the ID from the URL parameter
  const [pdf, setPdf] = useState([]); // Initialize the state to hold PDF data
  const token = useToken(); // Ensure you replace this with the actual token logic

  useEffect(() => {
    const getPdf = async () => {
      try {
          console.log("Starting PDF fetch...");
          const response = await axios.get("http://127.0.0.1:8000/api/getPdf", {
              headers: { Authorization: `Bearer ${token}` },
              params: { id_session: id }
          });

          console.log("Fetched PDF data:", response.data);
          if (response.data.pv) {
              setPdf(response.data.pv);
              console.log("Updated PDF details in state:", response.data.pv);
          }
      } catch (error) {
          console.error("Error fetching PDF data:", error);
      }
  };

  getPdf();
}, [id, token]); 

  useEffect(() => {
    if (pdf.length > 0) {
      console.log("PDF state updated, first element:", pdf[0]);
    }
  }, [pdf]);
  return (
    <div>
      <h1>PDF Files</h1>
      {pdf.length ? (
        
        <ul>
          {pdf.map((path, index) => (
            <div>
            <p>Chemin du fichier: {path.file_path}</p>
            <p>Date de l'examen: {path.date_examen}</p>
            <p>Demi-journée de l'examen: {path.demi_journee_examen}</p>
            <p>local: {path.type_local}-{path.num_local}</p>
            <li key={index}><a href={`/pdf/${path.file_path}`}>View PDF </a> </li> </div>
          ))}
        </ul>
      ) : (
        <p>No PDF files available.</p>
      )}
    </div>
  );
}

export default PagePdf;
