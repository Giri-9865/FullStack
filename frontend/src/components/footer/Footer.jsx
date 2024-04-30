import React from "react";
import { Link } from "react-router-dom";

import "./footer.css";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div>
          <Link to="/" className="link">
            GoEat
          </Link>
          <span className="text">© 2024 GoEat, Inc</span>
        </div>
      </footer>
    </>
  );
}
