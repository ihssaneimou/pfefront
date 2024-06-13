import React, { useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import TimeLine from "./TimeLine";
import HistoriqueSessions from "./HistoriqueSessions";
import Etudiants from "./Etudiants";
import Surveillants from "./Surveillants";
import Repartitions from "./Repartitions.jsx";
import TablettesAssociees from "./TablettesAssociees.jsx";
import TablettesRefusees from "./TablettesRefusees.jsx";
import TablettesNonAssociees from "./TablettesNonAssociees.jsx";
import DemandesAssociation from "./DemandesAssociation.jsx";
import Pvs from "./Pvs.jsx";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Article,
  DocumentScannerSharp,
  FileCopy,
  FileOpen,
  FilePresent,
  HomeSharp,
  ListAltSharp,
  Person,
  Timelapse,
} from "@mui/icons-material";

const Sidebar = () => {
  const logAction = (action) => {
    axios.post('http://localhost:8000/api/log-action', { action })
      .then(response => {
        console.log('Action logged:', action);
      })
      .catch(error => {
        console.error('Error logging action:', error);
      });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickTablette = () => {
    setOpenTablette(!openTablette);
  };

  const handleButtonClick = (text) => {
    handleAction(`Clicked on ${text}`);
  };

  const [open, setOpen] = useState(false);
  const [openTablette, setOpenTablette] = useState(false);
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
      case "/tablettesnonassociees":
        return <TablettesNonAssociees />;
      case "/tablettesrefusees":
        return <TablettesRefusees />;
      case "/demandesassociation":
        return <DemandesAssociation />;
      case "/pvs":
        return <Pvs />;
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
      <div className="drawer-side bg-gray-100 text-base-100">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <List
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="bg-gray-100"
        >
          <ListItemButton href="/home" onClick={() => handleButtonClick("Home")}>
            <ListItemIcon>
              <HomeSharp />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton href="/session" onClick={() => handleButtonClick("Session")}>
            <ListItemIcon>
              <Timelapse />
            </ListItemIcon>
            <ListItemText primary="Session" />
          </ListItemButton>
          <ListItemButton onClick={() => { handleClick(); handleButtonClick("Les listes") }}>
            <ListItemIcon>
              <ListAltSharp />
            </ListItemIcon>
            <ListItemText primary="Les listes" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} href="/session/listeetudiant" onClick={() => handleButtonClick("Etudiants")}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Etudiants" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} href="/session/listesurveillant" onClick={() => handleButtonClick("Surveillants")}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Surveillants" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton href="/repartitions" onClick={() => handleButtonClick("Repartitions")}>
            <ListItemIcon>
              <Article />
            </ListItemIcon>
            <ListItemText primary="Repartitions" />
          </ListItemButton>
          <ListItemButton onClick={() => { handleClickTablette(); handleButtonClick("Gestion tablettes") }}>
            <ListItemIcon>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="Gestion tablettes" />
            {openTablette ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTablette} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} href="/demandesassociation" onClick={() => handleButtonClick("Demandes d'associations")}>
                <ListItemIcon>
                  <FilePresent />
                </ListItemIcon>
                <ListItemText primary="Demandes d'associations" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} href="/tablettesassociees" onClick={() => handleButtonClick("Tablettes associees")}>
                <ListItemIcon>
                  <FileOpen />
                </ListItemIcon>
                <ListItemText primary="Tablettes associees" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} href="/tablettesnonassociees" onClick={() => handleButtonClick("Tablettes dissociees")}>
                <ListItemIcon>
                  <FileOpen />
                </ListItemIcon>
                <ListItemText primary="Tablettes dissociees" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} href="/tablettesrefusees" onClick={() => handleButtonClick("Tablettes refusees")}>
                <ListItemIcon>
                  <FileOpen />
                </ListItemIcon>
                <ListItemText primary="Tablettes refusees" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton href="/pvs" onClick={() => handleButtonClick("Les PVs")}>
            <ListItemIcon>
              <DocumentScannerSharp />
            </ListItemIcon>
            <ListItemText primary="Les PVs" />
          </ListItemButton>
        </List>
      </div>
      <div>
        <button onClick={() => logAction('Button Clicked')}>Click Me</button>
      </div>
    </div>
  );
};

export default Sidebar;
