import React from 'react';

const DownloadImage = () => {
  const imageUrl = 'https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'; // Replace with your image URL

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'etudimg.jpg'; // Specify the default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <h1>Download Image</h1>
      <button onClick={handleDownload}>Télécharger l'image</button>
    </div>
  );
}

export default DownloadImage;
