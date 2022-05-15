//*| Hooks and Libraries
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//*| Components
import ModalOverlay from "./ModalOverlay";

const ModalOne = ({
  handleCloseModal,
  icon,
  title,
  paragraph,
  navigateLink,
}: {
  handleCloseModal: any;
  icon?: string;
  title: string;
  paragraph?: string;
  navigateLink?: { name: string; link: string };
}) => {
  const navigate = useNavigate();
  return (
    <ModalOverlay handleCloseModal={handleCloseModal}>
      <motion.div
        className="modal modal-one"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "-100vh" }}
        animate={{ y: "-50%" }}
        exit={{ y: "100vh" }}
      >
        <svg
          onClick={handleCloseModal}
          className="modal-close-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <img className="modal-icon" src={icon} alt="icon" />
        <h2 className="modal-title">{title}</h2>
        <h3 className="modal-one-paragraph">{paragraph}</h3>
        <h3
          className="modal-one-link"
          onClick={() => navigate(`/${navigateLink?.link}`)}
        >
          {navigateLink?.name}
        </h3>
      </motion.div>
    </ModalOverlay>
  );
};

export default ModalOne;
