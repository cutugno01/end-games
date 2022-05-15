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
