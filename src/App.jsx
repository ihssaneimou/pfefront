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
import Pvs from "./pages/pvs.jsx";

function App() {
  return (
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
        <Route path="/demandesassociation" element={<Demandes />} />
        <Route path="/pvs" element={<Pvs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
