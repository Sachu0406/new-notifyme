import React from "react";
import { Button } from "react-bootstrap";
import { FaShareAlt } from "react-icons/fa";

interface ShareButtonProps {
  notifyId: string | number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ notifyId }) => {
  const handleShare = (notifyId: string | number) => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out!",
          url: `${url}/${notifyId}`,
        })
        .catch((error) => console.error("Sharing failed:", error));
    } else {
      alert("Sharing is not supported on this browser. Copy the link instead!");
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={() => handleShare(notifyId)}
      className="d-flex align-items-center"
    >
      <FaShareAlt className="me-1" /> Share
    </Button>
  );
};

export default ShareButton;
