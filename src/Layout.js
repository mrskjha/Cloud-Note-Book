import React from "react";
import Footer from "./components/Footer";
import NoteState from "./context/notes/NoteState";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


function Layout() {
  return (
    <NoteState>
      <Navbar />
      <Outlet  />
      <Footer />
    </NoteState>
  );
}

export default Layout;
