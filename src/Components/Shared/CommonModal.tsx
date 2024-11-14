import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface ModalProps {
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode;
  onSave: () => void;
  onClose: () => void;
  triggerText: string;
}

const CommonModal: React.FC<ModalProps> = ({
  title,
  content,
  footer,
  onSave,
  onClose,
  triggerText,
}) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                onClick={handleClose}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{content}</div>
            <div className="modal-footer">
              {footer}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonModal;
