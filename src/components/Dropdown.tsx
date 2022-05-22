//*| Hooks and Libraries
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

//*| Components

const Dropdown = ({
  handleClose,
  isOpen,
  links,
}: {
  handleClose: any;
  isOpen: boolean;
  links: {
    link: string;
    icon: JSX.Element;
  }[];
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="dropdown"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {links.map((link) => {
        return (
          <div
            key={link.link}
            className="dropdown-icon"
            onClick={() => {
              navigate(link.link);
            }}
          >
            {link.icon}
          </div>
        );
      })}
    </motion.div>
  );
};

export default Dropdown;
