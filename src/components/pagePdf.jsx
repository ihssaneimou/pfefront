import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../App';
import './pagePdf.css'; // Ensure the path to CSS file is correct

function PagePdf() {
  const { id } = useParams(); // Retrieve the ID from the URL parameter
  const [pdf, setPdf] = useState([]); // Initialize the state to hold PDF data
  const { token } = useToken(); // Ensure you replace this with the actual token logic

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
    <div className="pdf-container">
      <h1 className="pdf-heading">PDF Files</h1>
      {pdf.length ? (
        <ul className="pdf-list">
          {pdf.map((path, index) => (
            <li key={index} className="pdf-item">
              <div className="pdf-details">
                <p>Chemin du fichier: <span className="pdf-info">{path.file_path}</span></p>
                <p>Date de l'examen: <span className="pdf-info">{path.date_examen}</span></p>
                <p>Demi-journée de l'examen: <span className="pdf-info">{path.demi_journee_examen}</span></p>
                <p>local: <span className="pdf-info">{path.type_local}-{path.num_local}</span></p>
              </div>
              <a href={`/pdf/${path.file_path}`} className="pdf-link">View PDF</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pdf-empty">No PDF files available.</p>
      )}
    </div>
  );
}

export default PagePdf;
