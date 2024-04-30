import React from "react";
import { CircularProgress } from "@mui/material";

import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Spinner;
