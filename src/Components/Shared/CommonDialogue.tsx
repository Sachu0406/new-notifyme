/* eslint-disable @typescript-eslint/no-explicit-any */
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
        //style={{ maxinline-size: width || "" }}
      >
        <Modal.Header style={{ color: "black" }}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>{bodyContent}</Modal.Body>
        <Modal.Footer
          className={`d-flex ${
            cancelText && acceptText
              ? "justify-content-between"
              : "justify-content-end"
          }`}
        >
          {cancelText && (
            <Button variant="secondary" onClick={handleClose}>
              {cancelText}
            </Button>
          )}
          {acceptText && (
            <Button variant="info" onClick={handleProceed}>
              {acceptText}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommonDialogue;
