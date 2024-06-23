import React from 'react';
import { useParams } from 'react-router-dom';

function PdfViewer() {
  const { pdfPath } = useParams();
  const fileUrl = `http://localhost:8000/api/pdf/${pdfPath}`; // Adjust the URL to match your API endpoint

  return (
    <div className='h-full'  style={{ height: '100vh' }}>
      <iframe 
        src={fileUrl}
        width="100%"
        height="100%"
      >
      </iframe>
    </div>
  );
}

export default PdfViewer;
