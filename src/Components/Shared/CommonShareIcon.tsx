
import { Button } from "react-bootstrap";
import { FaShareAlt } from "react-icons/fa";

const ShareButton: React.FC = () => {
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out!",
          url,
        })
        .catch((error) => console.error("Sharing failed:", error));
    } else {
      alert("Sharing is not supported on this browser. Copy the link instead!");
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleShare}
      className="d-flex align-items-center"
    >
      <FaShareAlt className="me-1" /> Share
    </Button>
  );
};

export default ShareButton;
