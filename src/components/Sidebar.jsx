import React from "react";
import { Link, useLocation } from "react-router-dom";
import TimeLine from "./TimeLine";
import HistoriqueSessions from "./HistoriqueSessions";
import Etudiants from "./Etudiants";
import Surveillants from "./Surveillants";
import Repartitions from "./Repartitions.jsx";
import TablettesAssociees from "./TablettesAssociees.jsx";
import DemandesAssociation from "./DemandesAssociation.jsx";

const Sidebar = () => {
  const location = useLocation();
  const renderContent = () => {
    switch (location.pathname) {
      case "/home":
        return <TimeLine />;
      case "/session":
        return <HistoriqueSessions />;
      case "/session/listeetudiant":
        return <Etudiants />;
      case "/session/listesurveillant":
        return <Surveillants />;
      case "/repartitions":
        return <Repartitions />;
      case "/tablettesassociees":
        return <TablettesAssociees />;
      case "/demandesassociation":
        return <DemandesAssociation />;
      default:
        return null;
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content h-[100vh] p-8 bg-gray-200 text-black flex flex-col items-center">
        {renderContent()}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/session"}>Session</Link>
          </li>
          <li>
            <div className="collapse bg-base-200">
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title">Les listes</div>
              <div className="collapse-content">
                <p className="mb-2">
                  <Link to={"/session/listeetudiant"}>Etudiants</Link>
                </p>
                <p>
                  <Link to={"/session/listesurveillant"}>Surveillants</Link>
                </p>
              </div>
            </div>
            <Link className="ml-4" to={"/repartitions"}>
              Repartitions
            </Link>
          </li>
          <li>
            <div className="collapse bg-base-200">
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title">Gestion tablettes</div>
              <div className="collapse-content">
                <p className="mb-2">
                  <Link to={"/tablettesassociees"}>Tablettes associees</Link>
                </p>
                <p>
                  <Link to={"/demandesassociation"}>
                    Demandes d'association
                  </Link>
                </p>
              </div>
            </div>
          </li>
          <li>
            <Link>Les PVs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
