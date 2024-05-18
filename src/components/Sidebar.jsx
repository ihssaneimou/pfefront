import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TimeLine from "./TimeLine";
import HistoriqueSessions from "./HistoriqueSessions";
import Etudiants from "./Etudiants";
import Surveillants from "./Surveillants";
import Repartitions from "./Repartitions.jsx";
import TablettesAssociees from "./TablettesAssociees.jsx";
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
  const [open, setOpen] = useState(false);
  const [openTablette, setOpenTablette] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickTablette = () => {
    setOpenTablette(!open);
  };

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
          <ListItemButton href="/home">
            <ListItemIcon>
              <HomeSharp />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton href="/session">
            <ListItemIcon>
              <Timelapse />
            </ListItemIcon>
            <ListItemText primary="Session" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <ListAltSharp />
            </ListItemIcon>
            <ListItemText primary="Les listes" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} href="/session/listeetudiant">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Etudiants" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} href="/session/listesurveillant">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Surveillants" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton href="/repartitions">
            <ListItemIcon>
              <Article />
            </ListItemIcon>
            <ListItemText primary="Repartitions" />
          </ListItemButton>
          <ListItemButton onClick={handleClickTablette}>
            <ListItemIcon>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="Gestion tablettes" />
            {openTablette ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTablette} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} href="/tablettesassociees">
                <ListItemIcon>
                  <FileOpen />
                </ListItemIcon>
                <ListItemText primary="Tablettes associees" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} href="/demandesassociation">
                <ListItemIcon>
                  <FilePresent />
                </ListItemIcon>
                <ListItemText primary="Demandes d'associations" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton href="/pvs">
            <ListItemIcon>
              <DocumentScannerSharp />
            </ListItemIcon>
            <ListItemText primary="Les PVs" />
          </ListItemButton>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
