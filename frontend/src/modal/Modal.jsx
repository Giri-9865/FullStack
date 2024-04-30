import React from "react";
import ReactDom from "react-dom";

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .6)",
  zIndex: 1000,
};

const modalStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(240, 240, 240)",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "80%",
  width: "80%",
  borderRadius: "10px",
  overflow: "auto",
};

const closeButtonStyles = {
  marginLeft: "95%",
  marginTop: "5px",
  width: "30px",
  height: "30px",
  fontSize: "20px",
  fontWeight: "bolder",
  backgroundColor: "rgba(230, 180, 14, 0.908)",
  border: "none",
  cursor: "pointer",
};
export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <button style={closeButtonStyles} onClick={onClose}>
          {" "}
          X{" "}
        </button>
        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
