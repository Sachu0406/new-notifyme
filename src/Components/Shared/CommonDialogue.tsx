import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
interface pageProps {
  title: string;
  dialogueShow: boolean;
  bodyContent: any;
  cancelText: string;
  acceptText?: string;
  dSize?: "sm" | "lg" | "xl";
  width?: string;
  handleClose: () => void;
  handleProceed: () => void;
}
const CommonDialogue = ({
  title,
  dialogueShow,
  handleClose,
  bodyContent,
  cancelText,
  acceptText,
  dSize,
  handleProceed,
  width,
}: pageProps) => {
  return (
    <>
      <Modal
        show={dialogueShow}
        size={dSize}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        //dialogClassName="custom-modal"
        //style={{ maxWidth: width || "" }}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyContent}</Modal.Body>
        <Modal.Footer
          className={`d-flex ${
            cancelText && acceptText
              ? "justify-content-between"
              : "justify-content-end"
          }`}
        >
          <Button variant="secondary" onClick={handleClose}>
            {cancelText}
          </Button>
          {acceptText && (
            <Button variant="primary" onClick={handleProceed}>
              {acceptText}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommonDialogue;