import React from 'react';

function PdfViewer() {
  const fileUrl = 'http://localhost:8000/api/pdf/ZWbgMMKI1iT6gUCrQaMDSEYuWU77OoNYrLgsFKcA.pdf'; // Adjust the URL to match your API endpoint

  return (
    <div className='h-full'>
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
