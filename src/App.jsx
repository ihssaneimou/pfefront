import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Authentification from "./pages/authentification";
import Verification from "./pages/verification";
import Session from "./pages/session";
import Listeetudiant from "./pages/listeetudiant";
import Listesurveillants from "./pages/listesurveillants";
import Repartitions from "./pages/repartitions";
import Tablettes from "./pages/tablettes";
import Navbar from "./components/Navbar";
import Demandes from "./pages/demandes";
import Pvs from "./pages/pvs";
import { createContext, useContext, useState } from "react";
import Test from "./components/Test";
import Pdf from "./components/Testpdf";


const TokenContext = createContext();
export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/authentification" element={<Authentification />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/session" element={<Session />} />
          <Route path="/session/listeetudiant" element={<Listeetudiant />} />
          <Route path="/session/listesurveillant" element={<Listesurveillants />} />
          <Route path="/repartitions" element={<Repartitions />} />
          <Route path="/tablettesassociees" element={<Tablettes />} />
          <Route path="/tablettesrefusees" element={<Tablettes />} />
          <Route path="/tablettesbloquees" element={<Tablettes />} />
          <Route path="/demandesassociation" element={<Demandes />} />
          <Route path="/pvs" element={<Pvs />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
      //  <Test/>
      //  <Pdf /> 
          
  );
}

export default App;
