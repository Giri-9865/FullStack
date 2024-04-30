import React from "react";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "720px"}}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
