import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Authentification from "./pages/authentification";
import Verification from "./pages/verification";
import Session from "./pages/session";
import Listeetudiant from "./pages/listeetudiant";
import Listesurveillants from "./pages/listesurveillants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/home" element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/session/listeetudiant" element={<Listeetudiant />} />
        <Route
          path="/session/listesurveillant"
          element={<Listesurveillants />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
