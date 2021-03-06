import { useEffect } from "react";
import s from "./Modal.module.scss";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
