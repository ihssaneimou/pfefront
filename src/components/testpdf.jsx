import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function PdfViewer({ filename }) {
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {
        // URL to your Laravel API endpoint
        const apiUrl = `http://127.0.0.1:8000/api/pdf/pve.pdf`;
        fetch(apiUrl)
            .then(response => response.blob())
            .then(blob => {
                const pdfUrl = URL.createObjectURL(blob);
                setPdfFile(pdfUrl);
            })
            .catch(error => {
                console.error('Error fetching the PDF:', error);
            });
    }, [filename]);

    return (
        <div>
            {pdfFile ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js">
                    <Viewer fileUrl={pdfFile} />
                </Worker>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
}

export default PdfViewer;
